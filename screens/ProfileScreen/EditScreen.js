/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button, ButtonGroup } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { UPDATE_USER } from '../../store/types';
import styles from './styles';

function EditScreen() {
  const [text, setText] = useState('');
  const navegation = useNavigation();
  const dispatch = useDispatch();

  function handleBudaRequest(newName, newWallet) {
    dispatch({
      type: UPDATE_USER,
      payload: { name: newName, wallet: newWallet },
    });
    navegation.goBack();
  }

  const onPressEdit = () => handleBudaRequest(text, newWallet);

  const [buttonState, setSelectedIndex] = useState({ selectedIndex: 0 });
  const buttons = ['BitSplit', 'Buda'];

  const newWallet = buttons[buttonState.selectedIndex].toLowerCase();

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

        <ButtonGroup
          onPress={e => setSelectedIndex({ selectedIndex: e })}
          selectedIndex={buttonState.selectedIndex}
          buttons={buttons}
          containerStyle={styles.groupButtonContainer}
          selectedButtonStyle={styles.groupButton}
          titleStyle={styles.textButton}
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
