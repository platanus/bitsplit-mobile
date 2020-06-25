/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { BUDA_AUTH_REQUEST } from '../../store/types';
import styles from './styles';
import useForm from '../../utils/hooks/useForm';
import Header from '../../components/Header';

function handleBudaPayment() {
  const dispatch = useDispatch();

  function handleBudaRequest(newName) {
    dispatch({
      type: BUDA_AUTH_REQUEST,
      payload: { newName },
    });
  }

  return {
    handleBudaRequest,
  };
}

function EditScreen() {
  const [state, bind] = useForm(
    { newName: '' },
    {
      validations: { newName: value => !isNaN(value) },
      errorMessages: { newName: 'Debes ingresar un valor' },
    }
  );

  const onPayPress = () => handleBudaPayment(state.newName);

  return (
    <>
      <View style={styles.screen}>
        <Input
          {...bind('newName')}
          inputContainerStyle={styles.inputOff}
          inputStyle={styles.inputText}
          autoCapitalize='none'
          placeholder='Actualizar nombre de usuario'
        />

        <Button
          title='Guardar'
          type='solid'
          onPress={onPayPress}
          buttonStyle={styles.button}
          titleStyle={styles.textButton}
        />
      </View>
    </>
  );
}

export default EditScreen;
