/* eslint-disable max-statements */
import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Input,
  Button,
  Text,
  ThemeProvider,
  Overlay,
  Avatar,
} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { BUDA_AUTH_REQUEST, BUDA_CLEAN_ERROR } from '../../store/types';
import styles from './styles';
import Theme from '../../styles/Theme';
import colors from '../../styles/colors';

function BudaAuthScreen() {
  const { error, loading } = useSelector(state => state.buda);
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navegation = useNavigation();
  function handleBudaAuth() {
    dispatch({
      type: BUDA_AUTH_REQUEST,
      payload: { apiKey, apiSecret, password },
      callback: () => {
        navegation.goBack();
      },
    });
  }

  const cleanError = () => dispatch({ type: BUDA_CLEAN_ERROR });

  return (
    <>
      <ThemeProvider theme={Theme}>
        <View style={styles.screen}>
          <Avatar
            rounded
            size='large'
            containerStyle={styles.avatar}
            source={require('../../assets/Images/buda.png')}
          />
          <Input
            inputContainerStyle={styles.inputOff}
            id='API_KEY'
            required
            secureTextEntry
            autoCapitalize='none'
            value={apiKey}
            onChangeText={text => setApiKey(text)}
            placeholder='Buda API Key'
          />
          <Input
            inputContainerStyle={styles.inputOff}
            id='API_SECRET'
            required
            secureTextEntry
            autoCapitalize='none'
            value={apiSecret}
            onChangeText={text => setApiSecret(text)}
            placeholder='Buda API Secret'
            rightIcon={
              <Icon name='user-secret' size={24} color={colors.purple} />
            }
          />

          <Input
            inputContainerStyle={styles.inputOff}
            id='password'
            keyboardType='default'
            secureTextEntry
            required
            minLength={5}
            autoCapitalize='none'
            value={password}
            onChangeText={text => setPassword(text)}
            placeholder='Contraseña de BitSplit'
            rightIcon={
              <Icon name='eye-slash' size={24} color={colors.purple} />
            }
          />
          <Button
            buttonStyle={styles.button}
            titleStyle={styles.textButton}
            title='send'
            type='solid'
            onPress={() => handleBudaAuth()}
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

export default BudaAuthScreen;
