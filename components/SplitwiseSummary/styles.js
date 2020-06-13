import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  componentContainer: {
    backgroundColor: colors.middlepurple,
    borderRadius: 20,
    padding: '8%',
    margin: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 10,
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
    borderWidth: 1,
  },

  titleText: {
    color: colors.darkpurple,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
  },

  coinText: {
    color: colors.black,
    fontSize: 15,
    textAlign: 'center',
  },
});
export default { ...crossStyles, ...styles };
