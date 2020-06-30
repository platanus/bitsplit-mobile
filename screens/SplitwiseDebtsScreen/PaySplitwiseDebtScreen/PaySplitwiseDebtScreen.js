import React from 'react';
import { View, Button } from 'react-native';
import { Text } from 'react-native-elements';
import Header from '../../../components/Header';
import formatCurrency from '../../../utils/formatCurrency';
import { useRoute } from '@react-navigation/native';

function PaySplitwiseDebt() {
  const {
    params: { title, amount, currency_code, email, name },
  } = useRoute();

  return (
    <>
      <Header back title={title} />
      <View>
        <Text>Monto a pagar: {formatCurrency(amount, currency_code)}</Text>
        <Text>Destinatario: {email}</Text>
        <Button title='Pagar' />
      </View>
    </>
  );
}

export default PaySplitwiseDebt;
