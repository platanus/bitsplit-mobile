import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import Header from '../../../components/Header';
import formatCurrency from '../../../utils/formatCurrency';
import styles from './styles';

function PaySplitwiseDebt() {
  const {
    params: { title, amount, currency_code, email, name },
  } = useRoute();

  return (
    <>
      <Header back title={title} />
      <View style={styles.container}>
        <Text style={styles.title}>Monto</Text>
        <Text style={styles.money}>
          {formatCurrency(amount, currency_code)}
        </Text>
        <Text style={styles.user1}>{name}</Text>
        <Text style={styles.user2}>{email}</Text>

        <Button
          title='Pagar'
          buttonStyle={styles.button}
          titleStyle={styles.textButton}
        />
      </View>
    </>
  );
}

export default PaySplitwiseDebt;
