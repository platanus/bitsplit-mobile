/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Input,
  Button,
  Text,
  Overlay,
  ButtonGroup,
} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { BUDA_QUOTATION, BITSPLIT_WITHDRAWAL } from '../../store/types';
import styles from './styles';
import useForm from '../../utils/hooks/useForm';
import useToggle from '../../utils/hooks/useToggle';
import Header from '../../components/Header';
import QuotationComponent from '../../components/Quotation/QuotationComponent';
import colors from '../../styles/colors';

const minLnLength = 2;
const referenceQuotation = 1000;

function useBitSplitWithdrawal() {
  const dispatch = useDispatch();
  function handleBudaQuotation(amount) {
    dispatch({ type: BUDA_QUOTATION, payload: amount });
  }
  function handleBitSplitWithdrawal(
    invoice,
    amountBtc,
    withdrawalMethod,
    callback
  ) {
    dispatch({
      type: BITSPLIT_WITHDRAWAL,
      payload: { invoice, amountBtc, withdrawalMethod },
      callback,
    });
  }
  const {
    error,
    returnMessage,
    quotation,
    lastWithdrawal,
    loading,
  } = useSelector(state => state.buda);

  const btcEquivalent = parseFloat(quotation ? quotation.amount_btc[0] : '0');

  return {
    error,
    returnMessage,
    lastWithdrawal,
    loading,
    btcEquivalent,
    handleBitSplitWithdrawal,
    handleBudaQuotation,
  };
}

function validateLnCode(lnCode) {
  const invoice = lnCode.toUpperCase();
  const invoiceLen = invoice.length;
  if (invoiceLen <= minLnLength) {
    switch (invoiceLen) {
      case 0:
        return true;
      case 1:
        return invoice.substring(0, 1) === 'L';
      case 2:
        return invoice.substring(0, 2) === 'LN';
      default:
        return false;
    }
  }

  return invoice.substring(0, 2) === 'LN' && invoiceLen >= minLnLength;
}

function WithdrawalScreen() {
  const {
    error,
    returnMessage,
    lastWithdrawal,
    loading,
    btcEquivalent,
    handleBitSplitWithdrawal,
    handleBudaQuotation,
  } = useBitSplitWithdrawal();
  const [state, bind] = useForm(
    {
      invoiceCode: 'LN',
      transferAmount: '',
    },
    {
      validations: {
        invoiceCode: value => validateLnCode(value),
        transferAmount: value =>
          !handleBudaQuotation(referenceQuotation) && !isNaN(value),
      },
      sideEffects: {
        transferAmount: value => parseFloat(value),
      },
      errorMessages: {
        invoiceCode: 'El código lighgtning debe comenzar con LN',
        transferAmount: 'Debes ingresar un número',
      },
    }
  );

  // create initial quotation
  const transformationBtcClp = parseInt(
    (referenceQuotation / btcEquivalent) * state.transferAmount
  );

  const [buttonState, setSelectedIndex] = useState({ selectedIndex: 0 });
  const buttons = ['Buda', 'Otro'];

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setModalVisible(!modalVisible);
    state.invoiceCode = data.replace('lightning:', '');
  };

  const [isDisplayVisible, toggleDisplay] = useToggle();

  const invoiceCode = state.invoiceCode.toUpperCase();
  const isWithdrawDisabled = !invoiceCode || invoiceCode.length < minLnLength;

  const clearLN = () => {
    setScanned(false);
    state.invoiceCode = 'LN';
  };

  const onWithdrawalPress = () =>
    handleBitSplitWithdrawal(
      state.invoiceCode.toUpperCase(),
      state.transferAmount,
      buttons[buttonState.selectedIndex].toLowerCase(),
      toggleDisplay
    );

  return (
    <>
      <Header title='Retiro' />
      <ScrollView>
        <View style={styles.screen}>
          <Text h4>
            {(returnMessage && returnMessage.message) || returnMessage}
          </Text>
          {buttons[buttonState.selectedIndex] === 'Otro' ? (
            <Input
              {...bind('invoiceCode')}
              autoCapitalize='characters'
              placeholder='Código lightning'
              leftIcon={<Icon name='bolt' size={24} color={colors.purple} />}
              inputContainerStyle={styles.inputOff}
              inputStyle={styles.inputText}
            />
          ) : (
            <Input
              {...bind('transferAmount')}
              inputContainerStyle={styles.inputOff}
              inputStyle={styles.inputText}
              autoCapitalize='none'
              keyboardType='numeric'
              placeholder='Monto en BTC'
              leftIcon={<Icon name='dollar' size={24} color={colors.purple} />}
            />
          )}

          {hasPermission === null || hasPermission === false ? (
            <Text>Se debe autorizar a la app para utilizar la cámara</Text>
          ) : (
            <>
              <Modal
                visible={modalVisible}
                animationType={'slide'}
                onRequestClose={() => setModalVisible(!modalVisible)}
              >
                <View style={styles.cameraContainer}>
                  <BarCodeScanner
                    onBarCodeScanned={
                      scanned ? undefined : handleBarCodeScanned
                    }
                    style={styles.camera}
                  />
                </View>
              </Modal>
            </>
          )}

          <Text style={styles.text}>¿Hacia dónde se desea retirar?</Text>
          <ButtonGroup
            onPress={e => setSelectedIndex({ selectedIndex: e })}
            selectedIndex={buttonState.selectedIndex}
            buttons={buttons}
            containerStyle={styles.groupButtonContainer}
            selectedButtonStyle={styles.groupButton}
          />

          {buttons[buttonState.selectedIndex] === 'Buda' && (
            <QuotationComponent
              style={styles.quotationContainer}
              isValidQuotation={true}
              totalClp={transformationBtcClp}
              totalBitcoins={state.transferAmount}
            />
          )}

          {buttons[buttonState.selectedIndex] !== 'Buda' && (
            <Button
              title='Escanear QR'
              type='solid'
              onPress={() => {
                clearLN();
                setModalVisible(!modalVisible);
              }}
              disabled={buttons[buttonState.selectedIndex] === 'Buda'}
              loading={loading}
              buttonStyle={styles.button}
              titleStyle={styles.textButton}
            />
          )}

          <Button
            title='Retirar'
            type='solid'
            onPress={onWithdrawalPress}
            loading={loading}
            disabled={isWithdrawDisabled}
            buttonStyle={styles.button}
            titleStyle={styles.textButton}
          />

          {lastWithdrawal && (
            <Overlay
              isVisible={isDisplayVisible}
              overlayStyle={styles.overlayContainer}
              windowBackgroundColor='rgba(255, 255, 255, .5)'
              onBackdropPress={toggleDisplay}
            >
              <View style={styles.screen}>
                <Text h4>Retiro en proceso</Text>
                <Text h5>
                  Tu retiro se procesó el {lastWithdrawal.processed_at}
                </Text>
                <Text h5></Text>
                <Text
                  h5
                >{`Monto retirado en BTC: ${lastWithdrawal.amount}`}</Text>
                <Text h5></Text>
                <Button title='Listo' type='solid' onPress={toggleDisplay} />
              </View>
            </Overlay>
          )}
        </View>
      </ScrollView>
    </>
  );
}

export default WithdrawalScreen;
