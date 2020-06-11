/* eslint-disable max-statements */
import React from 'react';
import { View } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import {
  Button,
  Text,
  ThemeProvider,
  Overlay,
  Avatar,
} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { postSplitwiseAuthUrl } from './hooks';
import { BUDA_CLEAN_ERROR, FETCH_USER } from '../../store/types';
import styles from './styles';
import Header from '../../components/Header';
import Theme from '../../styles/Theme';

function SplitwiseAuthScreen() {
  const { error, loading } = useSelector(state => state.buda);
  const authUrl = postSplitwiseAuthUrl();
  const dispatch = useDispatch();

  const cleanError = () => dispatch({ type: BUDA_CLEAN_ERROR });
  const fetchUser = () => dispatch({ type: FETCH_USER });

  async function openAuthSessionAsync() {
    try {
      await WebBrowser.openAuthSessionAsync(authUrl);
      fetchUser();
    } catch (err) {
      console.log(err);
    }
  }

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
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.textButton}
            title='F'
            type='solid'
            onPress={openAuthSessionAsync}
            loading={loading}
          />
          <Text>{Linking.makeUrl()}</Text>
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
