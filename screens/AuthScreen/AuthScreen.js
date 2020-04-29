/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Divider, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_REQUEST, REGISTER_REQUEST } from '../../store/types';
import styles from './styles';
import colors from '../../styles/colors';

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
    }
  }

  useEffect(() => {
    if (token) {
      props.navigation.navigate({ routeName: 'Home' });
    }
  }, [token, props]);

  return (
    <View style={styles.inputContainer}>
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
        { isSignup && <Input
          id ="passwordConfirmation"
          label="Confirm Password"
          keyboardType="default"
          secureTextEntry
          required
          minLength={5}
          autoCapitalize="none"
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
        }
        <Button
          title={isSignup ? 'Register' : 'Login'}
          type="solid"
          onPress ={() => authHandler()}
          loading ={loading}

        />
        <Divider style={{ backgroundColor: 'gray', marginVertical: 15 }}/>
        <Text>{ isSignup ? 'New to Bitsplit?\nGo ahead and register!' : 'Already have an account?' }</Text>
        <Button
          title={isSignup ? 'Login' : 'Register'}
          type="outline"
          onPress ={() => setIsSignup(!isSignup)}
        />

      </ScrollView>
    </View>
  );
}

AuthScreen.navigationOptions = {
  headerTitle: 'BitSplit',
};

export default AuthScreen;
