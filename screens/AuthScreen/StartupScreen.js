/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import { View, ScrollView, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Divider, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_REQUEST, REGISTER_REQUEST } from '../../store/types';
import styles from './styles';
import colors from '../../styles/colors';

function StartupScreen(props) {
  useEffect(() => {
    const tryLogin = async () => {
      const userData = AsyncStorage.getItem('userData');
      if (!userData) {
        props.navegation.navigate('Authentication');

        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, user } = transformedData;
      props.navegation.navigate('Home');
    };
  });

  return (
    <View style={styles.screen}>
      <ScrollView>

        <Text>Hola</Text>

      </ScrollView>
    </View>
  );
}

export default StartupScreen;

