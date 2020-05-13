import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  new: {
    color: colors.lightblue,
  },
  old: {
    color: colors.gray,
  },
});
export default { ...styles, ...crossStyles };
