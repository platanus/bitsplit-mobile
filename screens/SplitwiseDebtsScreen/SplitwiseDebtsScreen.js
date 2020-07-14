import React from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './styles';
import { useSplitwiseDebts } from './hooks';
import Header from '../../components/Header';
import Debt from './Debt';

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
            {!!groupDebts &&
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

      {!!friendsToUser &&
        friendsToUser.map(debt => (
          <Debt key={`${debt.group_id}-${debt.id}`} {...debt} from />
        ))}
      {!!userToFriends &&
        userToFriends.map(debt => (
          <Debt key={`${debt.group_id}-${debt.id}`} {...debt} />
        ))}
    </>
  );
};

export default SplitwiseDebtsScreen;
