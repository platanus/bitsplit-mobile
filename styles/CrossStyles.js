import { StyleSheet } from 'react-native';
import color from './colors';

const crossStyles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: color.lightpurple,
  },

  primaryButton: {
    padding: 10,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 15,
    backgroundColor: color.purple,
  },

  menuButtonButton: {
    backgroundColor: color.red,
  },
});

export default crossStyles;
