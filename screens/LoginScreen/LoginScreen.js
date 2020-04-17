import React, {useState, useReducer, useCallback} from 'react';
import { View, Text, StyleSheet, Button, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import {LOGIN_REQUEST} from '../../store/types';
const LoginScreen = props => {
  const dispatch = useDispatch();
  const test_me = () => {
    dispatch({type: LOGIN_REQUEST, payload:{email:'disilva2@uc.cl',password:'diego221'}})
  }
  return(
    <View style={style.screen}>
      <Text>Login Screen</Text>

        <Input 
        id ="email" 
        label="E-mail"
        keyboardType='email-address'
        required
        email
        autoCapitalize="none"
        errorMessage="Ingrese un email valido"
        onInputChange={() => {}}
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
        onInputChange={() => {}}
        placeholder=' PIN'
        leftIcon={
          <Icon
            name='user'
            size={24}
            color='black'
          />
        }
        />
        <Button
          title="Login"
          type="solid"
          onPress ={()=> console.log('login')}
        />
        <Button
          title="Registrate"
          type="clear"
          onPress ={()=> test_me()}
        />
        
    </View>
  );
};


const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LoginScreen;
