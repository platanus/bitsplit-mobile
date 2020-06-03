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

  androidHeader: {
    backgroundColor: color.purple,
    height: 60, // 100 para iphone
    padding: 10,
  },

  iosHeader: {
    backgroundColor: color.purple,
    height: 100,
    padding: 10,
  },

  // primaryButton: {
  //   padding: 10,
  //   marginLeft: 50,
  //   marginRight: 50,
  //   borderRadius: 15,
  //   backgroundColor: color.purple,
  // },

  // menuButtonButton: {
  //   backgroundColor: color.red,
  // },
});

export default crossStyles;
