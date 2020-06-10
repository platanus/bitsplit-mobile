import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, ThemeProvider } from 'react-native-elements';
import { GET_WALLETS_BALANCES, START_SETUP } from '../../store/types';
import styles from './styles';
import Header from '../../components/Header';
import Theme from '../../styles/Theme';
import PinOverlay from '../../components/PinOverlay/PinOverlay';
import SplitwiseSummary from '../../components/SplitwiseSummary/SplitwiseSummary';
import Wallet from '../../components/Wallet/Wallet';

function HomeScreen() {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch({ type: GET_WALLETS_BALANCES });
  }, []);

  const startSetup = () => dispatch({ type: START_SETUP });

  return (
    <>
      <Header title='Inicio' />
      {startFlag && (
        <PinOverlay onFailure={startSetup} pinLength={4} maxTries={3} />
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
                  : 'Tenemos problemas con tu salgo'}
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
