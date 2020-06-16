import React from 'react';
import { Header } from 'react-native-elements';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';
import colors from '../styles/colors';
import styles from '../styles/CrossStyles';

const AppHeader = ({ title }) => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    SpaceMonoBold: require('../assets/fonts/SpaceMono-Bold.ttf'),
    SpaceMonoRegular: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

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
