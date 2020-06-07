/* eslint-disable max-statements */

import React from 'react';
import { View, TextInput, ScrollView, ActivityIndicator } from 'react-native';
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
      overlayStyle={styles.pinOverlayContainer}
      windowBackgroundColor='rgba(255, 255, 255, .5)'
    >
      <View style={styles.screen}>
        <View style={styles.titleContainer}>
          <Text h4 style={styles.title}>
            {storedPin ? 'Ingresar PIN' : 'Crear tu PIN'}
          </Text>
          <Text h6 style={{ color: 'red' }}>
            {message}
          </Text>
        </View>
        <View style={(styles.contentContainer, styles.pinContainer)}>
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
              style={styles.pinInput}
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
