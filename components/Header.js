import React from 'react';
import { Header } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const AppHeader = ({ title }) => {
  const navigation = useNavigation();

  return (
    <Header
      leftComponent={{
        icon: 'menu',
        color: '#fff',
        onPress: navigation.toggleDrawer,
      }}
      centerComponent={{ text: title, style: { color: '#fff' } }}
    />
  );
};

export default AppHeader;
