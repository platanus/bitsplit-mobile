import React from 'react';
import { ScrollView } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import styles from './styles';
import { useSplitwiseDebts } from './hooks';
import Header from '../../components/Header';
import formatCurrency from '../../utils/formatCurrency';

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
      <Text>{title}</Text>
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
    title={
      <Text style={from ? styles.from : styles.to}>{`${first_name} ${
        last_name || ''
      }`}</Text>
    }
    subtitle={`${from ? 'Te debe' : 'Debes'} ${formatCurrency(
      amount,
      currency_code
    )}`}
    bottomDivider
  />
);

export default SplitwiseDebtsScreen;
