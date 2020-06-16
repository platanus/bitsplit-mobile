import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  componentContainer: {
    backgroundColor: colors.middlepurple,
    borderRadius: 20,
    padding: '10%',
    paddingTop: '5%',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    color: colors.gray,
    fontSize: 18,
  },

  toCollectTitle: {
    fontSize: 18,
    color: colors.green,
  },
  toPayTitle: {
    fontSize: 18,
    color: colors.red,
  },
  coinText: {
    color: colors.gray,
    fontSize: 15,
  },
});
export default { ...crossStyles, ...styles };
