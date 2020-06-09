/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import { View, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Input,
  Button,
  Text,
  ThemeProvider,
  Overlay,
  Avatar,
} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { postSplitwiseAuthUrl } from './hooks';
import {
  BUDA_AUTH_REQUEST,
  BUDA_CLEAN_ERROR,
  SPLITWISE_POST_AUTH,
} from '../../store/types';
import styles from './styles';
import Header from '../../components/Header';
import Theme from '../../styles/Theme';
import colors from '../../styles/colors';

function SplitwiseAuthScreen(props) {
  const { error, loading } = useSelector(state => state.buda);
  const { user } = useSelector(state => state.auth);
  const authUrl = postSplitwiseAuthUrl();
  const dispatch = useDispatch();

  const cleanError = () => dispatch({ type: BUDA_CLEAN_ERROR });

  return (
    <>
      <Header title='Autentificación Splitwise' />
      <ThemeProvider theme={Theme}>
        <View style={styles.screen}>
          <Avatar
            rounded
            size='large'
            containerStyle={styles.avatar}
            source={require('../../assets/Images/split.jpg')}
          />
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.textButton}
            title='Autorizar'
            type='solid'
            onPress={() => Linking.openURL(authUrl)}
            loading={loading}
          />
          <Overlay
            isVisible={!!error}
            overlayStyle={styles.overlayError}
            onBackdropPress={cleanError}
          >
            <View style={styles.screen}>
              <Text style={styles.errorText}>
                Houston tenemos un problema, mensaje de error:{' '}
                {(error && error.message) || JSON.stringify(error)}
              </Text>
            </View>
          </Overlay>
        </View>
      </ThemeProvider>
    </>
  );
}

export default SplitwiseAuthScreen;
