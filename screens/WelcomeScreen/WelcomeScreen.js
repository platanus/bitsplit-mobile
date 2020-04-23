import React from 'react';
import { View } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import styles from './styles';

function WelcomeScreen(props) {
  return (
    <View style={styles.screen}>
      <SocialIcon
        title='Inicio'
        button onPress={() => {
          props.navigation.navigate({ routeName: 'Authentication' });
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
