import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  from: {
    color: colors.lightgreen,
    fontSize: 18,
    fontFamily: 'SpaceMonoRegular',
  },
  to: {
    color: colors.lightred,
    fontSize: 18,
    fontFamily: 'SpaceMonoRegular',
  },

  titleText: {
    margin: 10,
    backgroundColor: 'transparent',
    color: colors.darkpurple,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'SpaceMonoItalic',
  },
});
export default { ...styles, ...crossStyles };
