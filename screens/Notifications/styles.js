import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  new: {
    color: colors.green,
  },
  old: {
    color: colors.lightblue,
  },
});
export default { ...styles, ...crossStyles };
