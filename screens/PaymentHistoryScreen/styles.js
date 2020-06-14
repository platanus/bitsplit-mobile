import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  screen: {
    marginTop: 30,
    margin: 20,
  },
  received: {
    color: colors.green,
  },
  sent: {
    color: colors.red,
  },
});
export default { ...styles, ...crossStyles };
