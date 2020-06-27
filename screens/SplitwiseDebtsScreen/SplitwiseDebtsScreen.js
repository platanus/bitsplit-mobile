import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import styles from './styles';
import { useSplitwiseDebts } from '../HomeScreen/hooks';
import Header from '../../components/Header';
import formatCurrency from '../../utils/formatCurrency';
import colors from '../../styles/colors';
import TouchableScale from 'react-native-touchable-scale';

function SplitwiseDebtsScreen() {
  const [debts, loading] = useSplitwiseDebts();
  const { singleDebts, groupDebts } = debts;

  return (
    <>
      <Header title='Deudas Splitwise' />
      <ScrollView>
        {!loading && (
          <>
            <DebtList title='Deudas individuales' debts={singleDebts} />
            {groupDebts &&
              groupDebts.map(group => (
                <DebtList
                  key={group.group_id}
                  title={group.group_name}
                  debts={group}
                />
              ))}
          </>
        )}
      </ScrollView>
    </>
  );
}

const DebtList = ({ title, debts }) => {
  const { friendsToUser, userToFriends } = debts || {};

  return (
    <>
      <Text style={styles.titleText}>{title}</Text>

      {friendsToUser &&
        friendsToUser.map(debt => <Debt key={debt.id} {...debt} from />)}
      {userToFriends &&
        userToFriends.map(debt => <Debt key={debt.id} {...debt} />)}
    </>
  );
};

const Debt = ({ id, first_name, last_name, amount, from, currency_code }) => (
  <ListItem
    key={id}
    title={`${first_name} ${last_name || ''}`}
    titleStyle={from ? styles.from : styles.to}
    Component={TouchableScale}
    friction={90}
    tension={100}
    activeScale={0.95}
    containerStyle={from ? styles.received : styles.sent}
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
    subtitle={`${from ? 'Te debe' : 'Debes'} ${formatCurrency(
      amount,
      currency_code
    )}`}
    bottomDivider
  />
);

export default SplitwiseDebtsScreen;
