
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button } from 'react-native';
 
export const LoginScreen = () => {

  const foo = useSelector(state => state.auth.test)
  
  const dispatch = useDispatch();
  const test_me = () => {
    dispatch({type:'TEST'})
  }
 
  return (
    <View>
      <Text>Foo is {foo}.</Text>
      <Button onPress={() => test_me()} title='Increase Foo!' />
    </View>
  )
}