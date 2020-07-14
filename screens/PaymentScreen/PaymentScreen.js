/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Input,
  Button,
  Text,
  Overlay,
  ButtonGroup,
} from 'react-native-elements';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  BUDA_QUOTATION,
  BUDA_PAYMENT,
  BUDA_CLEAN_ERROR,
  GET_WALLETS_BALANCES,
} from '../../store/types';
import styles from './styles';
import useForm from '../../utils/hooks/useForm';
import useToggle from '../../utils/hooks/useToggle';
import Header from '../../components/Header';
import QuotationComponent from '../../components/Quotation/QuotationComponent';

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
  const cleanError = () => dispatch({ type: BUDA_CLEAN_ERROR });

  const storageSelection = useSelector(state => {
    const {
      auth: {
        user: { wallet: defaultWallet },
      },
      bitsplitWallet: { balance: bitsplitBalance },
      buda: {
        error,
        quotation,
        lastPayment,
        balance: budaBalance,
        loading,
        apiKey,
      },
    } = state;

    return {
      apiKey,
      defaultWallet,
      bitsplitBalance,
      error,
      quotation,
      lastPayment,
      budaBalance,
      loading,
    };
  }, shallowEqual);
  const { quotation } = storageSelection;
  const totalClp = parseInt(quotation ? quotation.amount_clp[0] : '0');
  const totalBitcoins = parseFloat(quotation ? quotation.amount_btc[0] : '0');

  return {
    ...storageSelection,
    cleanError,
    totalClp,
    totalBitcoins,
    handleBudaQuotation,
    handleBudaPayment,
  };
}

function PaymentScreen() {
  const {
    apiKey,
    defaultWallet,
    bitsplitBalance,
    budaBalance,
    cleanError,
    error,
    totalClp,
    totalBitcoins,
    lastPayment,
    loading,
    handleBudaQuotation,
    handleBudaPayment,
  } = useBudaPayments();

  const balances = [bitsplitBalance, budaBalance];
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

  const buttons = ['BitSplit'];
  if (apiKey) buttons.push('Buda');
  const [buttonState, setSelectedIndex] = useState({
    selectedIndex: buttons.findIndex(
      walletName => walletName.toLowerCase() === defaultWallet
    ),
  });
  const [isDisplayVisible, toggleDisplay] = useToggle();
  const transferAmount = parseInt(state.transferAmount);
  const evalFee = totalClp - transferAmount;
  const fee = evalFee && evalFee > 0 ? evalFee : '0';
  const isValidQuotation = transferAmount >= minTrxAmount;
  const isOverBudget =
    totalBitcoins > balances[buttonState.selectedIndex].BTC.amount;
  const isPayDisabled =
    !transferAmount || transferAmount <= minTrxAmount || isOverBudget;

  const clearInputs = () => {
    state.receptor = '';
    state.transferAmount = '';
  };

  const dispatch = useDispatch();
  const onPayPress = () => {
    handleBudaPayment(
      state.receptor,
      totalBitcoins,
      buttons[buttonState.selectedIndex].toLowerCase(),
      () => {
        toggleDisplay();
        dispatch({ type: GET_WALLETS_BALANCES });
      }
    );
    clearInputs();
  };

  return (
    <>
      <Header title='Transferencia' />
      <View style={styles.screen}>
        <Text style={styles.saldoText}>
          Wallet: {balances[buttonState.selectedIndex].BTC.amount} BTC
        </Text>

        <Input
          {...bind('receptor')}
          inputContainerStyle={styles.inputOff}
          inputStyle={styles.inputText}
          autoCapitalize='none'
          placeholder='Correo de quien recibe'
        />
        <Input
          {...bind('transferAmount')}
          keyboardType='numeric'
          inputContainerStyle={styles.inputOff}
          inputStyle={styles.inputText}
          autoCapitalize='none'
          placeholder='Monto de llegada en CLP'
        />

        <Text style={styles.text}>Enviar desde</Text>
        <ButtonGroup
          onPress={e => setSelectedIndex({ selectedIndex: e })}
          selectedIndex={buttonState.selectedIndex}
          buttons={buttons}
          containerStyle={styles.groupButtonContainer}
          selectedButtonStyle={styles.groupButton}
        />
        <QuotationComponent
          style={styles.quotationContainer}
          isValidQuotation={isValidQuotation}
          totalClp={totalClp}
          totalBitcoins={totalBitcoins}
          fee={fee}
        />

        <Button
          title={isOverBudget ? 'Insuficiente' : 'Pagar'}
          type='solid'
          onPress={onPayPress}
          loading={loading}
          disabled={isPayDisabled}
          buttonStyle={styles.button}
          titleStyle={styles.textButton}
        />
        {!!lastPayment && (
          <Overlay
            isVisible={isDisplayVisible}
            overlayStyle={styles.overlayContainer}
            onBackdropPress={toggleDisplay}
          >
            <View style={styles.screen}>
              <View style={styles.debug}>
                <Text h3 h3Style={styles.hTitleStyle}>
                  Pago Exitoso
                </Text>
                <Text h4 h4Style={styles.hSubtitle}>
                  {lastPayment.receiver_email} recibio tu pago!{' '}
                </Text>
                <Text h4 h4Style={styles.hSubtitle}>
                  {lastPayment.amount} BTC
                </Text>
                <Button
                  buttonStyle={[styles.button, styles.alertButton]}
                  titleStyle={styles.textButton}
                  title='Listo'
                  type='solid'
                  onPress={toggleDisplay}
                />
              </View>
            </View>
          </Overlay>
        )}
        <Overlay
          isVisible={!!error}
          overlayStyle={styles.overlayError}
          onBackdropPress={cleanError}
        >
          <View style={styles.screen}>
            <Text style={styles.errorText}>
              Houston tenemos un problema, mensaje de error:{' '}
              {(!!error && error.message) || JSON.stringify(error)}
            </Text>
          </View>
        </Overlay>
      </View>
    </>
  );
}

export default PaymentScreen;
