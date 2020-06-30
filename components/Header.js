import React from 'react';
import { Header } from 'react-native-elements';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import styles from '../styles/CrossStyles';

const AppHeader = ({ title, back }) => {
  const navigation = useNavigation();

  return (
    <Header
      containerStyle={
        Platform.OS === 'android' ? styles.androidHeader : styles.iosHeader
      }
      leftComponent={{
        icon: back ? 'arrow-back' : 'menu',
        color: colors.white,
        onPress: back ? navigation.goBack : navigation.toggleDrawer,
      }}
      centerComponent={{
        text: title,
        style: {
          color: colors.white,
          fontSize: 15,
          fontFamily: 'SpaceMonoRegular',
        },
      }}
    />
  );
};

export default AppHeader;
