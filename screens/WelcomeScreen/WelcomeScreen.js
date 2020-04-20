import React from 'react';
import { View } from 'react-native';
import { SocialIcon } from 'react-native-elements';
import Colors from '../../constants/Colors';
import { styles } from '../../components/styles';

function WelcomeScreen(props) {
  return (
    <View style={styles.screen}>
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
