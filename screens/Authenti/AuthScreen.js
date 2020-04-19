/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { LinearGradient } from 'expo-linear-gradient';
import { Input, Button, Divider, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_REQUEST, REGISTER_REQUEST } from '../../store/types';
import Colors from '../../constants/Colors';

const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function AuthScreen(props) {
  // const [isLoading, setIsLoading] = useState(false);
  // const [dataError, setError] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line camelcase
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  // const [switchFlag, setFlag] = useState(true);
  const dispatch = useDispatch();
  // we can add loading for submits
  const { token, error } = useSelector(state => state.auth);

  // Para que es useEffect?
  // useEffect(() => {
  //     if (error2) {
  //         Alert.alert('Un error se ha presentado', error2, [{text: 'Okay'}]);
  //     }

  // }, [error2]);

  function authHandler() {
    if (isSignup) {
      // setError(null);
      // setIsLoading(true);
      // try {
      dispatch({ type: REGISTER_REQUEST, payload: { email, password, 'password_confirmation': passwordConfirmation } });
      // } catch (err) {
      //     setError(err.errorMessage)
      // }
      // setIsLoading(false);
    } else {
      // setError(null);
      // setIsLoading(true);
      // try {
      dispatch({ type: LOGIN_REQUEST, payload: { email, password } });
      // props.navigation.navigate({ routeName: 'Home' });
      // } catch (err) {
      //     setError(err.errorMessage)
      // }
      // setIsLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      props.navigation.navigate({ routeName: 'Home' });
    }
  });

  function switchSignupRegister() {
    if (isSignup === true) {
      return (
        <View>
          <Button
            title="Login"
            type="solid"
            onPress ={() => authHandler()}
          />
          {/* <Button
            title="Cool Gradient Button"
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ['red', 'pink'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
          /> */}
          <Divider style={{ backgroundColor: 'gray', marginVertical: 15 }}/>
          <Text>New to Bitsplit? Go ahead an register!</Text>
          <Button
            title="Register"
            type="outline"
            onPress ={() => setIsSignup(false)}
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

        />
        <Divider style={{ backgroundColor: 'gray', marginVertical: 15 }}/>
        <Text>Already have an account?</Text>
        <Button
          title="Login"
          type="outline"
          onPress ={() => setIsSignup(true)}
        />
      </View>

    );
  }

  return (
    <View style={style.screen}>
      <ScrollView style={{ flex: 1 }}>

        <Text h2>{isSignup ? 'Login' : 'Register'}</Text>

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
