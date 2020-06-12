import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  componentContainer: {
    backgroundColor: colors.middlepurple,
    borderRadius: 20,
    padding: '10%',
    marginBottom: '10%',
    marginVertical: 5,
    paddingTop: '5%',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  titleContainer: {
    marginBottom: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontWeight: 'bold',
    color: colors.gray,
    fontSize: 18,
  },

  defaultWalletText: {
    fontSize: 18,
    color: colors.purple,
  },
  coinText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
export default { ...crossStyles, ...styles };
