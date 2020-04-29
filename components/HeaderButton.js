import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../styles/colors';

function CustomHeaderButton(props) {
  return (
    <HeaderButton
      {... props}
      IconComponent = {Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : colors.purple} />
  );
}

export default CustomHeaderButton;
