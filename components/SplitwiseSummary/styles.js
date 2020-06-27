import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  componentContainer: {
    backgroundColor: colors.middlepurple,
    padding: '5%',
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  plus: {
    backgroundColor: colors.lightgreen,
    width: '50%',
    padding: 5,
    borderColor: colors.green,
    borderWidth: 2,
  },

  less: {
    backgroundColor: colors.lightred,
    width: '50%',
    padding: 5,
    borderColor: colors.red,
    borderWidth: 2,
  },

  titleText: {
    color: colors.darkpurple,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'SpaceMonoRegular',
  },

  coinText: {
    color: colors.black,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'SpaceMonoRegular',
  },
});
export default { ...crossStyles, ...styles };
