/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Input,
  Button,
  Text,
  ThemeProvider,
  CheckBox,
} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import PinOverlay from '../../components/PinOverlay/PinOverlay';
import { LOGIN_REQUEST, REGISTER_REQUEST } from '../../store/types';
import styles from './styles';
import color from '../../styles/colors';
import Theme from '../../styles/Theme';

function AuthScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const {
    auth: { token, loading },
  } = useSelector(state => state);

  function authHandler() {
    if (isSignup) {
      dispatch({
        type: REGISTER_REQUEST,
        payload: {
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
    } else {
      dispatch({ type: LOGIN_REQUEST, payload: { email, password } });
    }
  }

  const goHome = () => {
    props.navigation.navigate('Home');
  };
  const togglePin = () => setShowPin(!showPin);
  useEffect(() => {
    if (token) {
      togglePin();
    }
  }, [token]);

  return (
    <ThemeProvider theme={Theme}>
      <View style={styles.screen}>
        <Image
          style={styles.image}
          resizeMode='cover'
          source={require('../../assets/logo.png')}
        />
        {isSignup && (
          <>
            <Text h2>Crea tu cuenta</Text>
            <Text h4>Es gratis y rápido!</Text>
          </>
        )}
        <Input
          inputContainerStyle={styles.inputOff}
          id='email'
          keyboardType='email-address'
          required
          email
          autoCapitalize='none'
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder='Correo'
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
          placeholder='Contraseña'
          rightIcon={<Icon name='eye-slash' size={24} color={color.purple} />}
        />
        {isSignup && (
          <Input
            inputContainerStyle={styles.inputOff}
            id='passwordConfirmation'
            keyboardType='default'
            secureTextEntry
            required
            minLength={5}
            autoCapitalize='none'
            value={passwordConfirmation}
            onChangeText={text => setPasswordConfirmation(text)}
            placeholder='Confirmar Contraseña'
            rightIcon={<Icon name='eye-slash' size={24} color={color.purple} />}
          />
        )}

        {isSignup && (
          <CheckBox
            center
            title='Acepto los términos de privacidad'
            containerStyle={styles.checkBox}
          />
        )}

        <Button
          title={isSignup ? 'Crear cuenta' : 'Ingresar'}
          type='outline'
          onPress={() => authHandler()}
          loading={loading}
          buttonStyle={styles.button}
          titleStyle={styles.textButton}
        />

        <Button
          title={isSignup ? 'Login' : 'Crear cuenta'}
          type='clear'
          onPress={() => setIsSignup(!isSignup)}
          titleStyle={styles.linkText}
        />
        {showPin && (
          <PinOverlay
            onSuccess={goHome}
            onFailure={togglePin}
            pinLength={4}
            maxTries={3}
          />
        )}
      </View>
    </ThemeProvider>
  );
}

AuthScreen.navigationOptions = {
  headerTitle: 'BitSplit',
};

export default AuthScreen;
