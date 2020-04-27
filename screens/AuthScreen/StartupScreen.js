/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import styles from './styles';

function StartupScreen(props) {
  useEffect(() => {
    async function tryLogin() {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Authentication');

        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, user } = transformedData;
      console.log(token, user);
      props.navigation.navigate('Home');
    }
    tryLogin();
  });

  return (
    <View style={styles.screen}>

    </View>
  );
}

export default StartupScreen;

