/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button, Text, Overlay } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import {
  BUDA_QUOTATION,
  BUDA_PAYMENT,
  BUDA_GET_BALANCE,
} from '../../store/types';
import styles from './styles';
import useForm from '../../utils/hooks/useForm';
import useToggle from '../../utils/hooks/useToggle';
import Header from '../../components/Header';

const minTrxAmount = 100;

function useBudaPayments() {
  const dispatch = useDispatch();
  function handleBudaQuotation(amount) {
    dispatch({ type: BUDA_QUOTATION, payload: amount });
  }
  function handleBudaPayment(receptor, amountBtc, callback) {
    dispatch({
      type: BUDA_PAYMENT,
      payload: { amountBtc, receptor },
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

  const [isDisplayVisible, toggleDisplay] = useToggle();
  const [errorVisible, setErrorVisible] = useState(false);

  const overlayError = () => {
    setErrorVisible(!errorVisible);
  };

  const transferAmount = parseInt(state.transferAmount);
  const evalFee = totalClp - transferAmount;
  const fee = evalFee && evalFee > 0 ? evalFee : '0';
  const isValidQuotation = transferAmount >= minTrxAmount;
  const isPayDisabled = !transferAmount || transferAmount <= minTrxAmount;

  const onPayPress = () =>
    handleBudaPayment(state.receptor, totalBitcoins, toggleDisplay);

  // const dispatch = useDispatch();
  // const {
  //   auth: {
  //     user: { email },
  //   },
  //   buda: { apiKey, balance },
  // } = useSelector(state => state);

  // useEffectBalance(() => {
  //   if (apiKey) {
  //     dispatch({ type: BUDA_GET_BALANCE });
  //   }
  // }, [apiKey, dispatch]);

  return (
    <>
      <Header title='Transferencia' />

      <View style={styles.screen}>
        <View style={styles.wallet}>
          <Text style={styles.saldoText}>Saldo: 0.000115065 BTC</Text>
        </View>
        <Input
          {...bind('receptor')}
          inputContainerStyle={styles.inputOff}
          autoCapitalize='none'
          placeholder='Receptor email'
        />
        <Input
          {...bind('transferAmount')}
          keyboardType='numeric'
          inputContainerStyle={styles.inputOff}
          autoCapitalize='none'
          placeholder='Monto de llegada en CLP'
        />

        <View style={styles.quotationContainer}>
          {isValidQuotation ? (
            <View>
              <Text style={styles.titleText}>Cotizacion</Text>
              <Text style={styles.moneyText}>Monto total CLP: ${totalClp}</Text>
              <Text style={styles.moneyText}>
                Monto total BTC: ${totalBitcoins}
              </Text>
              <Text style={styles.moneyText}>Costo por servicio: ${fee}</Text>
            </View>
          ) : (
            <Text style={styles.titleText}>
              La transferencia minima es $100 CLP
            </Text>
          )}
        </View>

        <Button
          buttonStyle={styles.button}
          titleStyle={styles.textButton}
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

        {error && error.message && (
          <Overlay
            isVisible={errorVisible}
            overlayStyle={styles.overlayError}
            onBackdropPress={overlayError}
          >
            <View style={styles.screen}>
              <Text style={styles.errorText}>
                Houston tenemos un problema, mensaje de error:{' '}
                {(error && error.message) || JSON.stringify(error)}
              </Text>
            </View>
          </Overlay>
        )}
      </View>
    </>
  );
}

export default PaymentScreen;
