import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import Header from '../../../components/Header';
import formatCurrency from '../../../utils/formatCurrency';
import styles from './styles';
import useSplitwisePayments from './hooks';

function PaySplitwiseDebt() {
  const {
    params: { title, amount, currency_code, email, name, group_id, to_user_id },
  } = useRoute();
  const { amountBtc, transfer, loading, error } = useSplitwisePayments({
    email,
    amount,
    currency_code,
    group_id,
    to_user_id,
  });

  return (
    <>
      <Header back title={title} />
      <View style={styles.container}>
        <Text style={styles.title}>Monto</Text>
        <Text style={styles.money}>
          {formatCurrency(amount, currency_code)}
        </Text>
        <Text style={styles.moneyBTC}>
          ({loading ? '...' : formatCurrency(amountBtc, 'BTC')})
        </Text>
        <Text style={styles.user1}>{name}</Text>
        <Text style={styles.user2}>{email}</Text>
        {error && <Text style={styles.error}>{error.message}</Text>}

        <Button
          onPress={transfer}
          title='Pagar'
          buttonStyle={styles.button}
          titleStyle={styles.textButton}
        />
      </View>
    </>
  );
}

export default PaySplitwiseDebt;
