/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import {
  Button,
  Text,
  ThemeProvider,
  Overlay,
  Avatar,
} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { BUDA_CLEAN_ERROR, FETCH_USER } from '../../store/types';
import api from '../../utils/api';
import styles from './styles';
import Header from '../../components/Header';
import Theme from '../../styles/Theme';

function SplitwiseAuthScreen() {
  const { error, loading } = useSelector(state => state.buda);
  const { user } = useSelector(state => state.auth);

  const [connected, setConnected] = useState(user.picture_url !== null);

  const dispatch = useDispatch();
  const cleanError = () => dispatch({ type: BUDA_CLEAN_ERROR });
  const fetchUser = () => dispatch({ type: FETCH_USER });

  async function openAuthSessionAsync() {
    try {
      const {
        data: {
          data: {
            attributes: { authorize_url },
          },
        },
      } = await api.splitwiseAuth();
      await WebBrowser.openAuthSessionAsync(authorize_url);
      await fetchUser();
      setConnected(user.picture_url !== null);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Header back title='Conecta Splitwise' />
      <ThemeProvider theme={Theme}>
        <View style={styles.screen}>
          <Avatar
            rounded
            size='xlarge'
            containerStyle={styles.avatar}
            source={require('../../assets/Images/split.jpg')}
          />
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.textButton}
            title={connected ? 'Splitwise ya está autorizado' : 'Autorizar'}
            type='solid'
            onPress={openAuthSessionAsync}
            disabled={connected}
            loading={loading}
          />
          <Overlay
            isVisible={!!error}
            overlayStyle={styles.overlayError}
            onBackdropPress={cleanError}
          >
            <View style={styles.screen}>
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
          </Overlay>
        </View>
      </ThemeProvider>
    </>
  );
}

export default SplitwiseAuthScreen;
