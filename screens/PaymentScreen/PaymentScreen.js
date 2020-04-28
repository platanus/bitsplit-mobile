/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { BUDA_QUOTATION, BUDA_PAYMENT } from '../../store/types';
import style from './styles';

function PaymentScreen() {
  const { error, quotation, attributes, loading } = useSelector(state => state.buda);
  const [receptor, setReceptor] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const minTrxAmount = 100;
  const dispatch = useDispatch();
  const totalClp = quotation ? quotation.amount_clp[0] : '0';
  const totalBitcoins = quotation ? quotation.amount_btc[0] : '0';
  const evalFee = parseInt(totalClp, 10) - parseInt(transferAmount, 10);
  const fee = evalFee && evalFee > 0 ? evalFee : '0';
  const transactionCompleted = attributes ? attributes.completed : false;

  function handleBudaQuotation(amount) {
    console.log('react view', transferAmount, amount);
    dispatch({ type: BUDA_QUOTATION, payload: amount });
  }

  function handleBudaPayment() {
    dispatch({ type: BUDA_PAYMENT, payload: { amountBtc: parseFloat(quotation.amount_btc[0]), receptor } });
  }

  return (
    <View style={style.screen}>
      <ScrollView style={{ flex: 1 }}>

        <Text h2>{'Transferencia'}</Text>

        <Text h4>{ error }</Text>
        <Input
          id ="receptor"
          label="Receptor"
          autoCapitalize="none"
          value={ receptor }
          onChangeText={ text => setReceptor(text) }
          placeholder='receptor email'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
        />
        <Input
          id ="transferAmount"
          label="Monto a transferir"
          autoCapitalize="none"
          value={transferAmount}
          onChangeText={text => {
            setTransferAmount(text);
            // dont use text. callbacks
            if (parseInt(text, 10) > minTrxAmount) {
              handleBudaQuotation(text);
            }
          }}
          placeholder='Monto de llegada en CLP'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
        />
        <View>

          <Text>Monto total CPL: ${totalClp}</Text>
          <Text>Monto total Bitcoins: ${totalBitcoins}</Text>
          <Text>Costo por servicio: ${ fee }</Text>
        </View>

        <Button
          title='Pagar'
          type="solid"
          onPress ={() => handleBudaPayment()}
          loading ={loading}
        />
        {
          transactionCompleted && <Text>Transaccion completada con exito</Text>
        }
      </ScrollView>
    </View>

  );
}

export default PaymentScreen;
