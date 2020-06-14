import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import color from '../../styles/colors';

const styles = StyleSheet.create({
  screen: {
    marginTop: 10,
    margin: 10,
  },

  inputOff: {
    backgroundColor: color.middlepurple,
    padding: 5,
    borderStyle: 'solid',
    borderRadius: 15,
    borderBottomWidth: 0,
    margin: 10,
  },

  button: {
    backgroundColor: color.darkpurple,
    padding: 10,
    borderColor: color.black,
    borderRadius: 10,
    borderWidth: 1.5,
    margin: 22,
  },

  inputText: {
    color: color.black,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  textButton: {
    padding: 10,
    color: color.lightpurple,
  },

  //   quotationContainer: {
  //     backgroundColor: color.middlepurple,
  //     margin: 22,
  //     height: '30%',
  //     borderRadius: 20,
  //     shadowColor: color.black,
  //     shadowOffset: { width: 0, height: 2 },
  //     shadowOpacity: 0.8,
  //     shadowRadius: 2,
  //     elevation: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
});

export default { ...crossStyles, ...styles };
