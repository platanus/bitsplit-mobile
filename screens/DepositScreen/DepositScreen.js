/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View, ScrollView, Clipboard, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Input,
  Button,
  Text,
  Overlay,
  ButtonGroup,
} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import {
  BUDA_QUOTATION,
  BITSPLIT_DEPOSIT,
  BUDA_CLEAN_ERROR,
} from '../../store/types';
import styles from './styles';
import useForm from '../../utils/hooks/useForm';
import useToggle from '../../utils/hooks/useToggle';
import Header from '../../components/Header';
import QuotationComponent from '../../components/Quotation/QuotationComponent';
import color from '../../styles/colors';

const minTrxAmount = 100;
const truncationLength = 25;

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

function truncate(string, n) {
  return string.substr(0, n - 1) + (string.length > n ? '...' : '');
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

  const clearInputs = () => {
    state.transferAmount = '';
  };

  const onDepositPress = () => {
    handleBitSplitDeposit(
      totalBitcoins,
      buttons[buttonState.selectedIndex].toLowerCase(),
      toggleDisplay
    );
    clearInputs();
  };

  const copyToClipboard = () => {
    Clipboard.setString(lastDeposit.payreq);
  };

  const closeCreated = () => {
    toggleDisplay();
    copyToClipboard();
  };

  const dispatch = useDispatch();
  const cleanError = () => dispatch({ type: BUDA_CLEAN_ERROR });

  return (
    <>
      <Header title={'Depositar'} />
      <ScrollView>
        <View style={styles.screen}>
          <Overlay
            isVisible={!!error}
            overlayStyle={styles.overlayError}
            onBackdropPress={cleanError}
          >
            <View style={styles.screen}>
              <Text style={styles.errorText}>
                Houston tenemos un problema, mensaje de error:{' '}
                {(error && error.message) || JSON.stringify(error)}
              </Text>
            </View>
          </Overlay>
          <Input
            {...bind('transferAmount')}
            inputContainerStyle={styles.inputOff}
            inputStyle={styles.inputText}
            autoCapitalize='none'
            keyboardType='numeric'
            placeholder='Monto en CLP'
            leftIcon={<Icon name='dollar' size={24} color={color.purple} />}
          />
          <QuotationComponent
            style={styles.quotationContainer}
            isValidQuotation={isValidQuotation}
            totalClp={totalClp}
            totalBitcoins={totalBitcoins}
          />
          <Text style={styles.text}>¿Desde dónde se desea cargar?</Text>
          <ButtonGroup
            onPress={e => setSelectedIndex({ selectedIndex: e })}
            selectedIndex={buttonState.selectedIndex}
            buttons={buttons}
            containerStyle={styles.groupButtonContainer}
            selectedButtonStyle={styles.groupButton}
          />

          <Button
            title='Crear Depósito'
            type='solid'
            onPress={onDepositPress}
            loading={loading}
            disabled={isPayDisabled}
            buttonStyle={styles.button}
            titleStyle={styles.textButton}
          />

          <Button
            title='Copiar último código'
            type='solid'
            onPress={copyToClipboard}
            disabled={lastDeposit === null}
            buttonStyle={styles.button}
            titleStyle={styles.textButton}
          />

          {lastDeposit && (
            <Overlay
              // isVisible={isDisplayVisible}
              overlayStyle={styles.overlayContainer}
              windowBackgroundColor='rgba(255, 255, 255, .5)'
              onBackdropPress={toggleDisplay}
            >
              <View style={styles.screen}>
                <Text h4>Depósito en proceso</Text>
                <Text h5>{`Monto en BTC: ${lastDeposit.amount}`}</Text>

                {/* give padding to QR as the prop does not accept a padding */}
                <Text h5></Text>
                <Image
                  source={{
                    uri: `http://api.qrserver.com/v1/create-qr-code/?data=${lastDeposit.payreq}&size=250x250`,
                  }}
                  style={{ height: 250 }}
                />
                <Text h5></Text>

                <Text h5>{`Código LN:\n\n${truncate(
                  lastDeposit.payreq,
                  truncationLength
                )}`}</Text>

                {lastDeposit.expires_at === null ? (
                  <Text>Fecha de transacción: {lastDeposit.processed_at}</Text>
                ) : (
                  <Text h5>
                    Tu código de depósito válido hasta el{' '}
                    {lastDeposit.expires_at}
                  </Text>
                )}
                <Text h5></Text>
                <Button
                  title='Copiar código y cerrar'
                  type='solid'
                  onPress={closeCreated}
                />
              </View>
            </Overlay>
          )}
        </View>
      </ScrollView>
    </>
  );
}

export default DepostitScreen;
