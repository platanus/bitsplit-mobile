import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  received: {
    color: colors.lightgreen,
    fontSize: 18,
    fontFamily: 'SpaceMonoRegular',
  },
  sent: {
    color: colors.lightred,
    fontSize: 18,
    fontFamily: 'SpaceMonoRegular',
  },
});
export default { ...crossStyles, ...styles };
