import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  screen: {
    marginTop: '0.1%',
  },
  to: {
    color: colors.lightred,
    fontSize: 18,
    fontFamily: 'SpaceMonoRegular',
  },

  titleText: {
    backgroundColor: colors.middlepurple,
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'SpaceMonoBoldItalic',
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
