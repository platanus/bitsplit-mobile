import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { SocialIcon } from 'react-native-elements';
import Colors from '../constants/Colors';



const WelcomeScreen = props => {
  return(

    
    <View style={style.screen}>

      <SocialIcon
        title='Sign In With Buda'
        button onPress={() => {
          props.navigation.navigate({routeName: 'Login'});
        }}
        type='medium'
      />

    </View>
  );
};


WelcomeScreen.navigationOptions = {
  headerTitle: 'BitSplit',
  headerStyle: {
    backgroundColor: Colors.primaryColor
  },
  headerTintColor: 'white'
}

const style = StyleSheet.create({  
  screen: {
    flex: 1,
    justifyContent: 'center',

  }
});

export default WelcomeScreen;