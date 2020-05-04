import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  received: {
    color: colors.green,
  },
  sent: {
    color: colors.red,
  },
});
export default { ...styles, ...crossStyles};
