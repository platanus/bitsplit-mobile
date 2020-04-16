import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';


const WelcomeScreen = props => {
  return(
    <View style={style.screen}>
      <Text>Bienvenido a BitSplit</Text>
      <Button title="Login" onPress={() => {
        props.navigation.navigate({routeName: 'Login'});
      }}></Button>

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

export default WelcomeScreen;