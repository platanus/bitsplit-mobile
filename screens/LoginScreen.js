import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';

const LoginScreen = props => {
  return(
    <View style={style.screen}>
      <Text>Login Screen</Text>
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
