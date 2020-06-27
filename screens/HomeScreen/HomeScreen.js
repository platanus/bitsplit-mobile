import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider, Text, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
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
import { useSplitwiseDebts } from './hooks';
import colors from '../../styles/colors';
import formatCurrency from '../../utils/formatCurrency';

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
  const [debts, loading] = useSplitwiseDebts();
  const { singleDebts, groupDebts } = debts;

  return (
    <>
      <Header title='Inicio' />
      {startFlag && (
        <PinOverlay onSuccess={startSetup} pinLength={4} maxTries={3} />
      )}
      <ThemeProvider theme={Theme}>
        {isSplitwiseSync && <SplitwiseSummary />}
        <Text style={styles.walletText}>Buda Wallet: 0.00000234 BTC</Text>
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

const DebtList = ({ title, debts }) => {
  const { userToFriends } = debts || {};

  return (
    <>
      {userToFriends &&
        userToFriends.map(debt => <Debt key={debt.id} {...debt} />)}
    </>
  );
};

const Debt = ({ id, first_name, last_name, amount, currency_code }) => (
  <ListItem
    key={id}
    title={`${first_name} ${last_name || ''}`}
    titleStyle={styles.to}
    Component={TouchableScale}
    friction={90}
    tension={100}
    activeScale={0.95}
    leftAvatar={{
      source: {
        uri:
          'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      },
    }}
    subtitleStyle={{
      fontFamily: 'SpaceMonoRegular',
      color: colors.darkpurple,
      fontSize: 15,
    }}
    subtitle={`Debes ${formatCurrency(amount, currency_code)}`}
    bottomDivider
    chevron={{ color: colors.darkpurpl, size: 25 }}
  />
);

export default HomeScreen;
