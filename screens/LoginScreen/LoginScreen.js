import React, {useState, useEffect } from 'react';
import { View,StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Input, Button, Divider, Text, } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import {LOGIN_REQUEST, REGISTER_REQUEST} from '../../store/types';

const LoginScreen = props => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [switch_flag, setFlag] =useState(true)

  const dispatch = useDispatch();
  const {token,error,loading} = useSelector( state => state.auth )

  const handleLogin = () => {
    dispatch({type: LOGIN_REQUEST, payload:{email,password}})
  };
  const handleRegister = () =>{
    dispatch({type: REGISTER_REQUEST, payload:{email,password,password_confirmation}})
  }
  useEffect(()=>{
    if(token){
      props.navigation.navigate({routeName: 'Home'});
    }
  })

  return(
    <View style={style.screen}>
      <ScrollView style={{flex:1}}>

        <Text h2>{switch_flag ? 'Login' : 'Register'}</Text>

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

  function switchSignupRegister(){
    if(switch_flag === true){
      return (
        <View>
          <Button
              title="Login"
              type="solid"
              onPress ={()=> handleLogin()}

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
            <Divider style={{ backgroundColor: 'gray', marginVertical:15}}/>
            <Text>New to Bitsplit? Go ahead an register!</Text>
            <Button
              title="Register"
              type="outline"
              onPress ={()=> setFlag(false)}
            />
        </View>
      )
    }

    return(
        <View>
          <Input
            id ="password_confirmation" 
            label="Confirm Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorMessage="Ingrese un contrasena valida"
            value={password_confirmation}
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
            onPress ={()=> handleRegister()}

          />
          <Divider style={{ backgroundColor: 'gray', marginVertical:15}}/>
          <Text>Already have an account? Why didn't you say so!</Text>
          <Button
            title="Login"
            type="outline"
            onPress ={()=> setFlag(true)}
          />
        </View>

    )

  }
};


const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LoginScreen;
