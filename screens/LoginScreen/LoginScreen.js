import React, {useState, useReducer, useCallback} from 'react';
import { View, Text, StyleSheet, Button, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import {LOGIN_REQUEST} from '../../store/types';
//import * as authActions from '../../store/actions/auth';


// const formReducer = (state, action) => {
//   if (action.type === FORM_INPUT_UPDATE){
//     const updatedValues = {
//       ... state.inputValues,
//       [action.input]: action.value
//     };
//     const updateValidities = {
//       ...state.inputValidities,
//       [action.input]: action.isValid
//     };
//     let updateFormIsvalid = true;
//     for (const key in updatedValities) {
//       updatedFormIsValid = updatedFormIsValid && updateValidities[key];
//     }
//     return{
//       formIsValid:updatedFormisVaid,
//       inputValidities: updatedValities,
//       inputValues: updatedValues
      
//     };
//   }
// return state;
// };

const LoginScreen = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch();
  const test_me = () => {
    dispatch({type: LOGIN_REQUEST, payload:{email,password}})
  };

  

  // const authHandler = () => {
  //   action = authActions.login(
  //     formState.inputValues.email, 
  //     formState.inputValues.password 
  //   );
  //   action = {type: LOGIN_REQUEST, payload:{email:formState.inputValues.email,password:formState.inputValues.password}}
  //   dispatch(action);
  // };



  

  return(
    <View style={style.screen}>
      <ScrollView>
        <Text>Login Screen</Text>

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
            onPress ={()=> test_me()}
            //onPress = {authHandler}

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
