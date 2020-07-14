import React, { useState } from 'react';
import { Overlay, Text, Button, Input } from 'react-native-elements';
import { View } from 'react-native';
import styles from './styles';

export default function NewUserOverlay({
  isVisible,
  newUser,
  onSuccess,
  hide,
}) {
  const [userConfirmation, setUserConfirmation] = useState('');

  const changeInput = text => {
    setUserConfirmation(text);
    if (text === newUser) {
      onSuccess();
      setUserConfirmation('');
      hide();
    }
  };

  return (
    <Overlay isVisible={isVisible} overlayStyle={styles.overlayContainer}>
      <View>
        <Text h3 h3Style={styles.hTitleStyle}>
          Confirma el Mail!
        </Text>
        <Text h4 h4Style={styles.hSubtitle}>
          {newUser} aun no tiene cuenta, le enviaremos un mail con instrucciones
          para que acceda al dinero de esta transferencia.
        </Text>
        <Input
          inputContainerStyle={styles.inputOff}
          inputStyle={styles.inputText}
          id='email'
          keyboardType='email-address'
          required
          email
          autoCapitalize='none'
          value={userConfirmation}
          onChangeText={changeInput}
          placeholder='Confirmar Correo'
        ></Input>
        <Button
          buttonStyle={[styles.button, styles.alertButton]}
          titleStyle={styles.textButton}
          title='Cancelar'
          type='solid'
          onPress={hide}
        />
      </View>
    </Overlay>
  );
}
