/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text, Overlay } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { BUDA_QUOTATION, BUDA_PAYMENT } from '../../store/types';
import styles from './styles';

function PaymentScreen() {
  const { error, quotation, lastPayment, loading } = useSelector(state => state.buda);
  const [receptor, setReceptor] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [overlayDisplay, setOverlayDisplay] = useState(false);
  const dispatch = useDispatch();

  const minTrxAmount = 100;
  const totalClp = quotation ? quotation.amount_clp[0] : '0';
  const totalBitcoins = quotation ? quotation.amount_btc[0] : '0';
  const evalFee = parseInt(totalClp, 10) - parseInt(transferAmount, 10);
  const fee = evalFee && evalFee > 0 ? evalFee : '0';

  function handleBudaQuotation(amount) {
    dispatch({ type: BUDA_QUOTATION, payload: amount });
  }

  function handleBudaPayment() {
    dispatch({ type: BUDA_PAYMENT, payload: { amountBtc: parseFloat(quotation.amount_btc[0]), receptor }, callback: () => setOverlayDisplay(true) });
  }

  return (
    <ScrollView>
      <View style={styles.screen}>

        <Text h2>{'Transferencia'}</Text>

        <Text h4>{ error }</Text>
        <Input
          id ="receptor"
          label="Receptor"
          autoCapitalize="none"
          value={receptor}
          onChangeText={text => setReceptor(text)}
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
            if (parseInt(text, 10) >= minTrxAmount) {
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
        <View style={styles.quotationContainer}>
          {
            parseInt(transferAmount, 10) >= minTrxAmount ?
              <View >
                <Text h4>Cotizacion</Text>
                <Text >Monto total CPL: ${totalClp}</Text>
                <Text >Monto total BTC: ${totalBitcoins}</Text>
                <Text>Costo por servicio: ${fee}</Text>
              </View> :
              <Text h4>La transferencia minima es $100 CLP</Text>
          }
        </View>

        <Button
          title='Pagar'
          type="solid"
          onPress ={() => handleBudaPayment()}
          loading ={loading}
          disabled={!parseInt(transferAmount, 10) || (parseInt(transferAmount, 10) <= minTrxAmount)}
        />
        {
          lastPayment &&
        <Overlay
          isVisible={overlayDisplay}
          overlayStyle={styles.overlayContainer}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          onBackdropPress={() => setOverlayDisplay(false)}
        >
          <View style={styles.screen}>
            <Text h4>Pago Exitoso</Text>
            <Text h5>{lastPayment.receiver_email} recibio tu pago! </Text>
            <Text h5>{`Monto Transferido en BTC \n ${lastPayment.amount}`}</Text>
            <Button
              title='Listo'
              type="solid"
              onPress ={() => setOverlayDisplay(false) }
            />
          </View>
        </Overlay>
        }

      </View>
    </ScrollView>

  );
}

export default PaymentScreen;
