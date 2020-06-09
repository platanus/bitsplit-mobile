import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import color from '../../styles/colors';

const styles = StyleSheet.create({
  screen: {
    marginTop: 90,
    margin: 30,
  },

  image: {
    marginBottom: 30,
  },

  inputOff: {
    backgroundColor: color.middlepurple,
    padding: 10,
    paddingLeft: 15,
    marginBottom: 30,
    borderStyle: 'solid',
    borderRadius: 15,
    borderBottomWidth: 0,
  },
  inputOn: {
    backgroundColor: color.red,
    padding: 10,
    marginBottom: 30,
    borderStyle: 'solid',
    borderRadius: 15,
    borderBottomWidth: 0,
  },
  button: {
    backgroundColor: color.white,
    padding: 10,
    marginBottom: 30,
    borderColor: color.black,
    borderRadius: 10,
    borderWidth: 1.5,
  },

  linkText: {
    padding: 10,
    marginBottom: 30,
    textDecorationLine: 'underline',
    color: color.black,
  },

  textButton: {
    padding: 10,
    color: color.black,
  },

  checkBox: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
});

export default { ...crossStyles, ...styles };
