import { StyleSheet } from 'react-native';
import color from './colors';

const crossStyles = StyleSheet.create({
  screen: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center',
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
