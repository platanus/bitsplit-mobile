import React from 'react';
import { Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import styles from '../styles/CrossStyles';

const AppHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <Header
      containerStyle={styles.header}
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
