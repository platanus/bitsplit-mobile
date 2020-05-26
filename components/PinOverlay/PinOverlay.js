/* eslint-disable max-statements */

import React from 'react';
import { View, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Overlay } from 'react-native-elements';
import styles from './styles';
import usePin from './hooks';

function PinOverlay({ onSuccess, onFailure, pinLength, maxTries }) {
  const { isDisplayVisible,
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
    onFailure,
  );

  return (
    <Overlay
      isVisible={isDisplayVisible}
      overlayStyle={styles.overlayContainer}
      windowBackgroundColor="rgba(255, 255, 255, .5)"
    >
      <View style={styles.screen}>
        <Text h4>{storedPin ? 'Ingresar PIN' : 'Crear tu PIN' }</Text>
        <Text h6 style={{ color: 'red' }}>{message}</Text>
        {
          closingSession ? <ActivityIndicator size={'large'}/> :
            <ScrollView contentContainerStyle={styles.pinContainer}
            >
              <TextInput
                ref={ele => { this.input = ele; }}
                onChangeText={onChangePin}
                value={inputPin}
                keyboardType = 'numeric'
                style={styles.pinInput}
                secureTextEntry={true}
                maxLength={pinLength}
              />
            </ScrollView>
        }

      </View>
    </Overlay>
  );
}

export default PinOverlay;
