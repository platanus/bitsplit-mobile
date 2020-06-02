import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import color from '../../styles/colors';

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginVertical: 20,
  },
  register: {
    backgroundColor: color.purple,
  },
  login: {
    backgroundColor: color.purple,
  },
});

export default { ...crossStyles, ...styles };
