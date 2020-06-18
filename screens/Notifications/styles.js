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
  text: {
    fontSize: 20,
    margin: 50,
    marginTop: 200,
  },
});
export default { ...crossStyles, ...styles };
