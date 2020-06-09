import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  from: {
    color: colors.green,
  },
  to: {
    color: colors.red,
  },
});
export default { ...styles, ...crossStyles };
