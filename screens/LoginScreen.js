import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

const LoginScreen = props => {
  return(
    <View style={style.screen}>
      <Text>Login Screen</Text>

        <Input
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
        placeholder=' PIN'
        leftIcon={
          <Icon
            name='user'
            size={24}
            color='black'
          />
        }
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
