/* eslint-disable max-statements */
import React from 'react';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text, Overlay } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { BUDA_QUOTATION, BITSPLIT_DEPOSIT } from '../../store/types';
import styles from './styles';
import useForm from '../../utils/hooks/useForm';
import useToggle from '../../utils/hooks/useToggle';
import Header from '../../components/Header';
import QuotationComponent from '../../components/Quotation/QuotationComponent';
import color from '../../styles/colors';

const minTrxAmount = 100;

function useBitSplitDeposit() {
  const dispatch = useDispatch();
  function handleBudaQuotation(amount) {
    dispatch({ type: BUDA_QUOTATION, payload: amount });
  }
  function handleBitSplitDeposit(amountBtc, callback) {
    dispatch({
      type: BITSPLIT_DEPOSIT,
      payload: { amountBtc },
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

  const transferAmount = parseInt(state.transferAmount);
  // const evalFee = totalClp - transferAmount;
  // const fee = evalFee && evalFee > 0 ? evalFee : '0';
  const isValidQuotation = transferAmount >= minTrxAmount;
  const isPayDisabled = !transferAmount || transferAmount <= minTrxAmount;

  const onDepositPress = () =>
    handleBitSplitDeposit(totalBitcoins, toggleDisplay);

  return (
    <>
      <Header title='Depositar' />
      <View style={styles.screen}>
        <Text h4>{(error && error.message) || error}</Text>
        <Text h4>
          {(returnMessage && returnMessage.message) || returnMessage}
        </Text>
        <Input
          {...bind('transferAmount')}
          inputContainerStyle={styles.inputOff}
          inputStyle={{
            ...styles.inputText,
            ...{ fontFamily: 'SpaceMonoRegular' },
          }}
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

        <Button
          title='Crear Depósito'
          type='solid'
          onPress={onDepositPress}
          loading={loading}
          disabled={isPayDisabled}
          buttonStyle={styles.button}
          titleStyle={{
            ...styles.textButton,
            ...{ fontFamily: 'SpaceMonoRegular' },
          }}
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
              <Text
                h5
              >{`Monto a depositar en BTC \n ${lastDeposit.amount}`}</Text>
              <Text h5>
                Tu código de retiro es válido hasta el {lastDeposit.expires_at}
              </Text>
              <Text h5>{`Código LN:\n${lastDeposit.payreq}`}</Text>
              <Button title='Listo' type='solid' onPress={toggleDisplay} />
            </View>
          </Overlay>
        )}
      </View>
    </>
  );
}

export default DepostitScreen;
