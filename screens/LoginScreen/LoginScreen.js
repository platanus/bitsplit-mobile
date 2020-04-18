import React, {useState, useEffect,useReducer, useCallback} from 'react';
import { View, Text, StyleSheet, Button, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import {LOGIN_REQUEST} from '../../store/types';

const LoginScreen = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const {token,error,loading} = useSelector( state => state.auth )
  const handleLogin = () => {
    dispatch({type: LOGIN_REQUEST, payload:{email,password}})
  };

  useEffect(()=>{
    if(token){
      props.navigation.navigate({routeName: 'Home'});
    }
  })

  return(
    <View style={style.screen}>
      <ScrollView>
        <Text>Login Screen</Text>
        <Text>{error}</Text>
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
            onPress ={()=> handleLogin()}

          />
          <Button
            title="Registrate"
            type="clear"
            onPress ={()=> test_me()}
          />
      </ScrollView>
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
