/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Input, Button, Divider, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_REQUEST, REGISTER_REQUEST } from '../../store/types';

const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line camelcase
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [switchFlag, setFlag] = useState(true);
  const dispatch = useDispatch();
  // we can add loading for submits
  const { token, error } = useSelector(state => state.auth);

  function handleLogin() {
    dispatch({ type: LOGIN_REQUEST, payload: { email, password } });
  }
  function handleRegister() {
    dispatch({ type: REGISTER_REQUEST, payload: { email, password, 'password_confirmation': passwordConfirmation } });
  }

  useEffect(() => {
    if (token) {
      // Home
      props.navigation.navigate({ routeName: 'BudaAuth' });
    }
  });
  function switchSignupRegister() {
    if (switchFlag === true) {
      return (
        <View>
          <Button
            title="Login"
            type="solid"
            onPress ={() => handleLogin()}
          />
          <Button
            title="Cool Gradient Button"
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ['red', 'pink'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
          />
          <Divider style={{ backgroundColor: 'gray', marginVertical: 15 }}/>
          <Text>New to Bitsplit? Go ahead an register!</Text>
          <Button
            title="Register"
            type="outline"
            onPress ={() => setFlag(false)}
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
              name='user'
              size={24}
              color='black'
            />
          }
        />
        <Button
          title="Register"
          type="solid"
          onPress ={() => handleRegister()}

        />
        <Divider style={{ backgroundColor: 'gray', marginVertical: 15 }}/>
        <Text>Already have an account?</Text>
        <Button
          title="Login"
          type="outline"
          onPress ={() => setFlag(true)}
        />
      </View>

    );
  }

  return (
    <View style={style.screen}>
      <ScrollView style={{ flex: 1 }}>

        <Text h2>{switchFlag ? 'Login' : 'Register'}</Text>

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
              name='user'
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

export default LoginScreen;
