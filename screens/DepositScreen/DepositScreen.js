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
import QRCode from 'react-native-qrcode-svg';
import { BUDA_QUOTATION, BITSPLIT_DEPOSIT } from '../../store/types';
import styles from './styles';
import useForm from '../../utils/hooks/useForm';
import useToggle from '../../utils/hooks/useToggle';
import Header from '../../components/Header';
import QuotationComponent from '../../components/QuotationComponent';

const minTrxAmount = 100;

function useBitSplitDeposit() {
  const dispatch = useDispatch();
  function handleBudaQuotation(amount) {
    dispatch({ type: BUDA_QUOTATION, payload: amount });
  }
  function handleBitSplitDeposit(amountBtc, depositMethod, callback) {
    dispatch({
      type: BITSPLIT_DEPOSIT,
      payload: { amountBtc, depositMethod },
      callback,
    });
  }

  const { error, returnMessage, quotation, lastDeposit, loading } = useSelector(
    state => state.buda
  );

  const totalClp = parseInt(quotation ? quotation.amount_clp[0] : '0');
  const totalBitcoins = parseFloat(quotation ? quotation.amount_btc[0] : '0');

  return {
    error,
    returnMessage,
    totalClp,
    totalBitcoins,
    lastDeposit,
    loading,
    handleBudaQuotation,
    handleBitSplitDeposit,
  };
}

function DepostitScreen() {
  const {
    error,
    returnMessage,
    totalClp,
    totalBitcoins,
    lastDeposit,
    loading,
    handleBudaQuotation,
    handleBitSplitDeposit,
  } = useBitSplitDeposit();
  const [state, bind] = useForm(
    { transferAmount: '' },
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

  const [buttonState, setSelectedIndex] = useState({ selectedIndex: 0 });
  const buttons = ['Buda', 'Otro'];

  const transferAmount = parseInt(state.transferAmount);
  // const evalFee = totalClp - transferAmount;
  // const fee = evalFee && evalFee > 0 ? evalFee : '0';
  const isValidQuotation = transferAmount >= minTrxAmount;
  const isPayDisabled = !transferAmount || transferAmount <= minTrxAmount;

  const onDepositPress = () =>
    handleBitSplitDeposit(
      totalBitcoins,
      buttons[buttonState.selectedIndex].toLowerCase(),
      toggleDisplay
    );

  return (
    <>
      <Header title={'Depositar'} />
      <ScrollView>
        <View style={styles.screen}>
          <Text h4>{(error && error.message) || error}</Text>
          <Text h4>
            {(returnMessage && returnMessage.message) || returnMessage}
          </Text>
          <Input
            {...bind('transferAmount')}
            label='Monto a depositar'
            autoCapitalize='none'
            placeholder='Monto a depositar en CLP'
            leftIcon={<Icon name='dollar' size={24} color='black' />}
          />
          <QuotationComponent
            style={styles.quotationContainer}
            isValidQuotation={isValidQuotation}
            totalClp={totalClp}
            totalBitcoins={totalBitcoins}
          />
          <Text h4>¿Desde donde se desea cargar?</Text>
          <ButtonGroup
            onPress={e => setSelectedIndex({ selectedIndex: e })}
            selectedIndex={buttonState.selectedIndex}
            buttons={buttons}
            containerStyle={styles.groupButtonContainer}
            selectedButtonStyle={styles.groupButton}
          />

          <Button
            title='Crear depósito'
            type='solid'
            onPress={onDepositPress}
            loading={loading}
            disabled={isPayDisabled}
          />
          {lastDeposit && (
            <Overlay
              isVisible={isDisplayVisible}
              overlayStyle={styles.overlayContainer}
              windowBackgroundColor='rgba(255, 255, 255, .5)'
              onBackdropPress={toggleDisplay}
            >
              <View style={styles.screen}>
                <Text h4>Depósito en proceso</Text>
                <Text h5>{`Monto en BTC \n ${lastDeposit.amount}`}</Text>
                {lastDeposit.expires_at === null ? (
                  <Text>Fecha de transacción: {lastDeposit.processed_at}</Text>
                ) : (
                  <Text h5>
                    Tu código de retiro es válido hasta el{' '}
                    {lastDeposit.expires_at}
                  </Text>
                )}
                <QRCode value={`${lastDeposit.payreq}`} size={250} />
                <Text h5>{`Código LN:\n${lastDeposit.payreq}`}</Text>
                <Button title='Listo' type='solid' onPress={toggleDisplay} />
              </View>
            </Overlay>
          )}
        </View>
      </ScrollView>
    </>
  );
}

export default DepostitScreen;
