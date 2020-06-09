/* eslint-disable max-statements */

import React from 'react';
import { View, TextInput, ActivityIndicator, Image } from 'react-native';
import { Text, Overlay } from 'react-native-elements';
import styles from './styles';
import usePin from './hooks';

function PinOverlay({ onSuccess = () => {}, onFailure, pinLength, maxTries }) {
  const {
    isDisplayVisible,
    inputPin,
    storedPin,
    onChangePin,
    message,
    closingSession,
  } = usePin(
    this,
    { inputPin: '', message: '' },
    pinLength,
    maxTries,
    onSuccess,
    onFailure
  );

  return (
    <Overlay
      isVisible={isDisplayVisible}
      containerStyle={styles.pinOverlayContainer}
      overlayStyle={styles.pinView}
      // windowBackgroundColor='rgba(255, 255, 255, .5)'
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          resizeMode='cover'
          source={require('../../assets/logo_blanco.png')}
        />

        <Text style={styles.titleText}>
          {storedPin ? 'Ingresar PIN' : 'Crear tu PIN'}
        </Text>
        <Text style={styles.errorText}>{message}</Text>

        <View>
          {closingSession ? (
            <ActivityIndicator size={'large'} />
          ) : (
            <TextInput
              ref={ele => {
                this.input = ele;
              }}
              onChangeText={onChangePin}
              value={inputPin}
              keyboardType='numeric'
              style={styles.inputText}
              secureTextEntry={true}
              maxLength={pinLength}
            />
          )}
        </View>
      </View>
    </Overlay>
  );
}

export default PinOverlay;
