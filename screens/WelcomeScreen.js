import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';


const WelcomeScreen = props => {
  return(
    <View style={style.screen}>
      <Text>Bienvenido a BitSplit</Text>
        <Input
        placeholder='BASIC INPUT'
        />

        <Input
        placeholder='INPUT WITH ICON'
        leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
        />

        <Input
        placeholder='INPUT WITH CUSTOM ICON'
        leftIcon={
          <Icon
            name='user'
            size={24}
            color='black'
          />
        }
        />

        <Input
        placeholder='INPUT WITH ERROR MESSAGE'
        errorStyle={{ color: 'red' }}
        errorMessage='ENTER A VALID ERROR HERE'
        />

    </View>
  );
};

// STYLE O STYLESSS?
const style = StyleSheet.create({  
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default WelcomeScreen;