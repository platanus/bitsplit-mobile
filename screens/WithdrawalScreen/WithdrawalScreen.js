/* eslint-disable max-statements */
import React from 'react';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text, Overlay } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { BITSPLIT_WITHDRAWAL } from '../../store/types';
import styles from './styles';
import useForm from '../../utils/hooks/useForm';
import useToggle from '../../utils/hooks/useToggle';
import Header from '../../components/Header';

const minLnLength = 2;

function useBitSplitWithdrawal() {
  const dispatch = useDispatch();
  function handleBitSplitWithdrawal(invoice, callback) {
    dispatch({
      type: BITSPLIT_WITHDRAWAL,
      payload: { invoice },
      callback,
    });
  }
  const { error, lastWithdrawal, loading } = useSelector(state => state.buda);

  return {
    error,
    lastWithdrawal,
    loading,
    handleBitSplitWithdrawal,
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
    lastWithdrawal,
    loading,
    handleBitSplitWithdrawal,
  } = useBitSplitWithdrawal();
  const [state, bind] = useForm(
    { invoiceCode: 'LN' },
    {
      validations: { invoiceCode: value => validateLnCode(value) },
      sideEffects: {},
      errorMessages: {
        invoiceCode: 'El código lighgtning debe comenzar con LN',
      },
    }
  );

  const [isDisplayVisible, toggleDisplay] = useToggle();

  const invoiceCode = state.invoiceCode.toUpperCase();
  const isWithdrawDisabled = !invoiceCode || invoiceCode.length < minLnLength;

  const onWithdrawalPress = () =>
    handleBitSplitWithdrawal(state.invoiceCode.toUpperCase(), toggleDisplay);

  return (
    <>
      <Header title='Retiro' />
      <ScrollView>
        <View style={styles.screen}>
          <Text h4>{(error && error.message) || error}</Text>
          <Input
            {...bind('invoiceCode')}
            autoCapitalize='characters'
            placeholder='Código lightning'
            leftIcon={<Icon name='code' size={24} color='black' />}
          />
          <Button
            title='Retirar'
            type='solid'
            onPress={onWithdrawalPress}
            loading={loading}
            disabled={isWithdrawDisabled}
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
                <Text
                  h5
                >{`Monto retirado en BTC \n ${lastWithdrawal.amount}`}</Text>
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
