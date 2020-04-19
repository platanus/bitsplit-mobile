import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import Colors from '../../constants/Colors';

const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',

  },
});

function WelcomeScreen(props) {
  return (
    <View style={style.screen}>
      <SocialIcon
        title='Sign In With Buda'
        button onPress={() => {
          props.navigation.navigate({ routeName: 'Autentificacion' });
        }}
        type='medium'
      />
    </View>
  );
}

WelcomeScreen.navigationOptions = {
  headerTitle: 'BitSplit',
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
  headerTintColor: 'white',
};

export default WelcomeScreen;
