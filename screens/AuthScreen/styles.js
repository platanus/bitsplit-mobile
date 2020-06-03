import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import color from '../../styles/colors';

const styles = StyleSheet.create({
  screen: {
    marginTop: 100,
    margin: 30,
  },

  image: {
    marginBottom: 30,
  },

  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 50,
    marginVertical: 100,
  },
  inputOff: {
    backgroundColor: '#EEEDFB',
    padding: 10,
    marginBottom: 30,
    borderStyle: 'solid',
    borderRadius: 15,
    borderBottomWidth: 0,
  },
  register: {
    backgroundColor: '#EEEDFB',
    padding: 10,
    marginBottom: 30,
  },
  login: {
    backgroundColor: color.purple,
  },
});

export default { ...crossStyles, ...styles };
