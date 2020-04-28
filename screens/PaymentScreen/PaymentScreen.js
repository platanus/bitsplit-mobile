/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text, Overlay } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { BUDA_QUOTATION, BUDA_PAYMENT, BUDA_UNMOUNT_LAST_PAYMENT } from '../../store/types';
import styles from './styles';

function PaymentScreen() {
  const { error, quotation, lastPayment, loading } = useSelector(state => state.buda);
  const [receptor, setReceptor] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
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
    dispatch({ type: BUDA_PAYMENT, payload: { amountBtc: parseFloat(quotation.amount_btc[0]), receptor } });
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ ...styles.screen, borderWidth: 1 }}>

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
        {
          parseInt(transferAmount, 10) >= minTrxAmount ?
            <View>
              <Text h4>Monto total CPL: ${totalClp}</Text>
              <Text h4 >Monto total Bitcoins: ${totalBitcoins}</Text>
              <Text h4>Costo por servicio: ${ fee }</Text>
            </View> :
            <Text h4>La transferencia minima es $100 CLP</Text>
        }

        <Button
          title='Pagar'
          type="solid"
          onPress ={() => handleBudaPayment()}
          loading ={loading}
          disabled={! parseInt(transferAmount, 10) || (parseInt(transferAmount, 10) <= minTrxAmount)}
        />

        { lastPayment &&
          <Overlay
            isVisible={!!lastPayment}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            onBackdropPress={() => { dispatch({ type: BUDA_UNMOUNT_LAST_PAYMENT }); }}
          >
            <View style={styles.screen}>
              <Text h3>Succesful Payment</Text>
              <Text h4>{`Monto Transferido en BTC \n ${lastPayment.amount}`}</Text>
              <Text h4>Receptor {lastPayment.receiver_email} </Text>
              <Button
                title='Listo'
                type="solid"
                onPress ={() => { dispatch({ type: BUDA_UNMOUNT_LAST_PAYMENT }); }}
              />
            </View>

          </Overlay>
        }

      </View>
    </ScrollView>

  );
}

export default PaymentScreen;
