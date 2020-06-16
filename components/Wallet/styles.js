import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const walletStyles = StyleSheet.create({
  defaultWallet: {
    backgroundColor: colors.darkpurple,
    borderRadius: 20,
    padding: '8%',
    marginBottom: '10%',
    margin: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 10,
  },

  secondWallet: {
    backgroundColor: colors.purple,
    borderRadius: 20,
    padding: '8%',
    marginBottom: '5%',
    margin: 10,
  },

  titleWallet: {
    color: colors.lightpurple,
    fontSize: 18,
    marginTop: '-5%',
  },

  coinText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: colors.lightpurple,
    textAlign: 'center',
    padding: '10%',
  },

  defaultWalletText: {
    textAlign: 'center',
    fontSize: 15,
    color: colors.red,
  },
});
export default { ...crossStyles, ...walletStyles };
