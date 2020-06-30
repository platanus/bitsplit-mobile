import { StyleSheet } from 'react-native';
import color from './colors';

const crossStyles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
  },

  androidHeader: {
    backgroundColor: color.purple,
    height: 60,
    padding: 10,
  },

  iosHeader: {
    backgroundColor: color.purple,
    height: 100,
    padding: 10,
  },
});

export default crossStyles;
