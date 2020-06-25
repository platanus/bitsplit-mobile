/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { BUDA_AUTH_REQUEST } from '../../store/types';
import styles from './styles';

function EditScreen() {
  const [text, setText] = useState('');
  const navegation = useNavigation();
  const dispatch = useDispatch();

  function handleBudaRequest(newName) {
    dispatch({
      type: BUDA_AUTH_REQUEST,
      payload: { newName },
    });
    navegation.goBack();
  }

  const onPressEdit = () => handleBudaRequest(text);

  return (
    <>
      <View style={styles.screen}>
        <Input
          inputContainerStyle={styles.input}
          inputStyle={styles.inputText}
          autoCapitalize='none'
          placeholder='Actualizar nombre'
          onChangeText={text => setText(text)}
          defaultValue={text}
        />

        <Button
          title='Guardar'
          type='solid'
          buttonStyle={styles.button}
          titleStyle={styles.textButton}
          onPress={() => onPressEdit()}
        />
        <Button
          title='Cancelar'
          type='solid'
          buttonStyle={styles.button}
          titleStyle={styles.textButton}
          onPress={() => navegation.goBack()}
        />
      </View>
    </>
  );
}

export default EditScreen;
