import React, { useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ThemeProvider, Text, Avatar } from 'react-native-elements';
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
import authedAxios from '../../utils/api/authedAxios';
import { useSplitwiseDebts } from '../SplitwiseDebtsScreen/hooks';
import Debt from '../SplitwiseDebtsScreen/Debt';

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
  const startSetup = useStartup();
  const [debts, loading] = useSplitwiseDebts();
  const { singleDebts, groupDebts } = debts;
  const { user } = useSelector(state => state.auth);
  const isSplitSync = user.picture_url !== null;

  const {
    auth: {
      user: { wallet: defaultWallet },
    },
    buda: { balance: budaBalance, apiKey },
    bitsplitWallet: { balance: bitsplitBalance },
    splitwise: { isSync: isSplitwiseSync },
  } = useSelector(state => state);

  const navegation = useNavigation();
  const goSplitwiseSync = () => navegation.navigate('SplitwiseAuth');

  return (
    <>
      <Header title='Inicio' />

      <PinOverlay onSuccess={startSetup} pinLength={4} maxTries={3} />

      {isSplitSync ? (
        <SplitwiseSummary />
      ) : (
        <TouchableOpacity
          onPress={goSplitwiseSync}
          style={styles.splitwiseIcon}
        >
          <Avatar
            containerStyle={styles.walletAvatar}
            source={require('../../assets/Images/splitOff.png')}
            size='large'
            rounded
          />
        </TouchableOpacity>
      )}

      <ThemeProvider theme={Theme}>
        {defaultWallet === 'bitsplit' && bitsplitBalance && (
          <Text style={styles.walletText}>
            Bitsplit Wallet: ${bitsplitBalance.BTC.amount} BTC
          </Text>
        )}

        {defaultWallet === 'buda' && apiKey && (
          <Text style={styles.walletText}>
            Buda Wallet: ${budaBalance.BTC.amount} BTC
          </Text>
        )}

        <Text style={styles.titleText}>Deudas</Text>
        <ScrollView>
          {!loading && (
            <>
              <DebtList debts={singleDebts} />
              {groupDebts &&
                groupDebts.map(group => (
                  <DebtList key={group.group_id} debts={group} />
                ))}
            </>
          )}
        </ScrollView>
      </ThemeProvider>
    </>
  );
}

const DebtList = ({ debts }) => {
  const { userToFriends } = debts || {};

  return (
    <>
      {userToFriends &&
        userToFriends.map(debt => <Debt key={debt.id} {...debt} />)}
    </>
  );
};

export default HomeScreen;
