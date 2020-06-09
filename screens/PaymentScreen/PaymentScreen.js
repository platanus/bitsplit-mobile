/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Input,
  Button,
  Text,
  Overlay,
  ButtonGroup,
} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { BUDA_QUOTATION, BUDA_PAYMENT } from '../../store/types';
import styles from './styles';
import useForm from '../../utils/hooks/useForm';
import useToggle from '../../utils/hooks/useToggle';
import Header from '../../components/Header';
import QuotationComponent from '../../components/QuotationComponent';

const minTrxAmount = 100;

function useBudaPayments() {
  const dispatch = useDispatch();
  function handleBudaQuotation(amount) {
    dispatch({ type: BUDA_QUOTATION, payload: amount });
  }
  function handleBudaPayment(receptor, amountBtc, wallet, callback) {
    dispatch({
      type: BUDA_PAYMENT,
      payload: { amountBtc, receptor, wallet },
      callback,
    });
  }

  const { error, quotation, lastPayment, loading } = useSelector(
    state => state.buda
  );

  const totalClp = parseInt(quotation ? quotation.amount_clp[0] : '0');
  const totalBitcoins = parseFloat(quotation ? quotation.amount_btc[0] : '0');

  return {
    error,
    totalClp,
    totalBitcoins,
    lastPayment,
    loading,
    handleBudaQuotation,
    handleBudaPayment,
  };
}

function PaymentScreen() {
  const {
    error,
    totalClp,
    totalBitcoins,
    lastPayment,
    loading,
    handleBudaQuotation,
    handleBudaPayment,
  } = useBudaPayments();
  const [state, bind] = useForm(
    { receptor: '', transferAmount: '' },
    {
      validations: { transferAmount: value => !isNaN(value) },
      sideEffects: {
        transferAmount: value =>
          parseInt(value) >= minTrxAmount && handleBudaQuotation(value),
      },
      errorMessages: { transferAmount: 'Debes ingresar un número' },
    }
  );

  const [buttonState, setSelectedIndex] = useState({ selectedIndex: 0 });
  const buttons = ['BitSplit', 'Buda'];

  const [isDisplayVisible, toggleDisplay] = useToggle();

  const transferAmount = parseInt(state.transferAmount);
  const evalFee = totalClp - transferAmount;
  const fee = evalFee && evalFee > 0 ? evalFee : '0';
  const isValidQuotation = transferAmount >= minTrxAmount;
  const isPayDisabled = !transferAmount || transferAmount <= minTrxAmount;

  const onPayPress = () =>
    handleBudaPayment(
      state.receptor,
      totalBitcoins,
      buttons[buttonState.selectedIndex].toLowerCase(),
      toggleDisplay
    );

  return (
    <>
      <Header title='Transferencia' />
      <ScrollView>
        <View style={styles.screen}>
          <Text h4>{(error && error.message) || error}</Text>
          <Input
            {...bind('receptor')}
            autoCapitalize='none'
            placeholder='receptor email'
            leftIcon={<Icon name='user' size={24} color='black' />}
          />
          <Input
            {...bind('transferAmount')}
            label='Monto a transferir'
            autoCapitalize='none'
            placeholder='Monto de llegada en CLP'
            leftIcon={<Icon name='user' size={24} color='black' />}
          />
          <ButtonGroup
            onPress={e => setSelectedIndex({ selectedIndex: e })}
            selectedIndex={buttonState.selectedIndex}
            buttons={buttons}
          />
          <QuotationComponent
            style={styles.quotationContainer}
            isValidQuotation={isValidQuotation}
            totalClp={totalClp}
            totalBitcoins={totalBitcoins}
            fee={fee}
          />

          <Button
            title='Pagar'
            type='solid'
            onPress={onPayPress}
            loading={loading}
            disabled={isPayDisabled}
          />
          {lastPayment && (
            <Overlay
              isVisible={isDisplayVisible}
              overlayStyle={styles.overlayContainer}
              windowBackgroundColor='rgba(255, 255, 255, .5)'
              onBackdropPress={toggleDisplay}
            >
              <View style={styles.screen}>
                <Text h4>Pago Exitoso</Text>
                <Text h5>{lastPayment.receiver_email} recibio tu pago! </Text>
                <Text
                  h5
                >{`Monto Transferido en BTC \n ${lastPayment.amount}`}</Text>
                <Button title='Listo' type='solid' onPress={toggleDisplay} />
              </View>
            </Overlay>
          )}
        </View>
      </ScrollView>
    </>
  );
}

export default PaymentScreen;
