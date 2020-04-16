import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';


const WelcomeScreen = props => {
  return(
    <View style={style.screen}>
      <Text>Bienvenido a BitSplit</Text>
      <Button title="Login"></Button>
    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default WelcomeScreen;