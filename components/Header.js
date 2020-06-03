import React from 'react';
import { Header } from 'react-native-elements';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import styles from '../styles/CrossStyles';

const AppHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <Header
      containerStyle={
        Platform.OS === 'android' ? styles.androidHeader : styles.iosHeader
      }
      leftComponent={{
        icon: 'menu',
        color: colors.white,
        onPress: navigation.toggleDrawer,
      }}
      centerComponent={{ text: title, style: { color: '#fff' } }}
    />
  );
};

export default AppHeader;
