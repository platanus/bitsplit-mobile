/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Divider, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_REQUEST, REGISTER_REQUEST } from '../../store/types';
import Colors from '../../constants/Colors';
import styles from './styles';

function AuthScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const { token, error, loading } = useSelector(state => state.auth);

  function authHandler() {
    if (isSignup) {
      dispatch({ type: REGISTER_REQUEST, payload: { email, password, 'password_confirmation': passwordConfirmation } });
    } else {
      dispatch({ type: LOGIN_REQUEST, payload: { email, password } });
      console.log('is async?');
    }
  }

  useEffect(() => {
    if (token) {
      props.navigation.navigate({ routeName: 'Home' });
    }
  });

  function switchSignupRegister() {
    if (isSignup === false) {
      return (
        <View>
          <Button
            title="Login"
            type="solid"
            onPress ={() => authHandler()}
            loading = {loading}
          />
          <Divider style={{ backgroundColor: 'gray', marginVertical: 15 }}/>
          <Text>New to Bitsplit? Go ahead an register!</Text>
          <Button
            title="Register"
            type="outline"
            onPress ={() => setIsSignup(true)}
          />
        </View>
      );
    }

    return (
      <View>
        <Input
          id ="passwordConfirmation"
          label="Confirm Password"
          keyboardType="default"
          secureTextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Ingrese un contrasena valida"
          value={passwordConfirmation}
          onChangeText={(text) => setPasswordConfirmation(text)}
          placeholder=' password'
          leftIcon={
            <Icon
              name='lock'
              size={24}
              color='black'
            />
          }
        />
        <Button
          title="Register"
          type="solid"
          onPress ={() => authHandler()}
          loading ={loading}

        />
        <Divider style={{ backgroundColor: 'gray', marginVertical: 15 }}/>
        <Text>Already have an account?</Text>
        <Button
          title="Login"
          type="outline"
          onPress ={() => setIsSignup(false)}
        />
      </View>

    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView>

        <Text h2>{isSignup ? 'Register' : 'Login' }</Text>

        <Text h4>{error}</Text>
        <Input
          id ="email"
          label="E-mail"
          keyboardType='email-address'
          required
          email
          autoCapitalize="none"
          errorMessage="Ingrese un email valido"
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder=' Usuario'
          leftIcon={
            <Icon
              name='user'
              size={24}
              color='black'
            />
          }
        />

        <Input
          id ="password"
          label="Password"
          keyboardType="default"
          secureTextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Ingrese un contrasena valida"
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder=' password'
          leftIcon={
            <Icon
              name='lock'
              size={24}
              color='black'
            />
          }
        />
        {switchSignupRegister()}
      </ScrollView>
    </View>
  );
}

AuthScreen.navigationOptions = {
  headerTitle: 'BitSplit',
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
  headerTintColor: 'white',
};

export default AuthScreen;
