import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'react-native-elements';
import {
  GET_WALLETS_BALANCES,
  START_SETUP,
  SPLITWISE_GET_DEBTS,
} from '../../store/types';
import styles from './styles';
import Header from '../../components/Header';
import Theme from '../../styles/Theme';
import PinOverlay from '../../components/PinOverlay/PinOverlay';
import SplitwiseSummary from '../../components/SplitwiseSummary/SplitwiseSummary';
import Wallet from '../../components/Wallet/Wallet';
import authedAxios from '../../utils/api/authedAxios';

function useStartup() {
  const dispatch = useDispatch();
  const {
    auth: {
      user: { email },
      token,
    },
  } = useSelector(state => state);

  useEffect(() => {
    if (email && token) {
      authedAxios.createInstance({ email, token });
      dispatch({ type: GET_WALLETS_BALANCES });
      dispatch({ type: SPLITWISE_GET_DEBTS });
    }
  }, [email, token]);

  return () => dispatch({ type: START_SETUP });
}

function HomeScreen() {
  const {
    auth: {
      user: { wallet: defaultWallet },
    },
    buda: { balance: budaBalance, apiKey },
    bitsplitWallet: {
      balance: bitsplitBalance,
      loading: bitsplitWalletLoading,
    },
    onstart: { startFlag },
    splitwise: { isSync: isSplitwiseSync },
  } = useSelector(state => state);

  const startSetup = useStartup();

  return (
    <>
      <Header title='Inicio' />
      {startFlag && (
        <PinOverlay onSuccess={startSetup} pinLength={4} maxTries={3} />
      )}
      <ThemeProvider theme={Theme}>
        <View style={styles.screen}>
          {bitsplitBalance ? (
            <Wallet
              name={'Bitsplit'}
              isDefault={defaultWallet === 'bitsplit'}
              balance={bitsplitBalance}
            />
          ) : (
            <View style={styles.wallet}>
              <Text style={styles.saldoText}>
                {bitsplitWalletLoading
                  ? 'Cargando...'
                  : 'Tenemos problemas con tu saldo'}
              </Text>
            </View>
          )}

          {apiKey && (
            <Wallet
              name={'Buda'}
              balance={budaBalance}
              isDefault={defaultWallet === 'buda'}
            />
          )}

          {isSplitwiseSync && <SplitwiseSummary />}
        </View>
      </ThemeProvider>
    </>
  );
}

export default HomeScreen;
