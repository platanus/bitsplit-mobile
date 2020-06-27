import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  screen: {
    marginTop: '0.1%',
  },
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
    padding: 10,
    backgroundColor: colors.middlepurple,
    borderColor: colors.purple,
    borderWidth: 1,
    color: colors.darkpurple,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'SpaceMonoBoldItalic',
    width: '100%',
  },

  walletText: {
    backgroundColor: colors.middlepurple,
    color: colors.darkpurple,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'SpaceMonoRegular',
    width: '100%',
    paddingBottom: 10,
  },
});

export default { ...crossStyles, ...styles };
