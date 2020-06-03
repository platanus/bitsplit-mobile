import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';
// import * as Font from 'expo-font';

// const getFonts = () => {
//   Font.loadAsync({
//     'space-mono': require('../../assets/font/SpaceMono-Regular.ttf'),
//   });
// };

const styles = StyleSheet.create({
  screen: {
    marginTop: 30,
    margin: 30,
  },

  avatar: {
    width: 110,
    height: 110,
  },

  nameText: {
    fontSize: 18,
    marginLeft: 125,
    marginTop: -110,
    marginBottom: 2,
  },

  emailText: {
    fontSize: 13,
    marginLeft: 125,
    marginBottom: 5,
  },

  walletText: {
    fontSize: 15,
    marginLeft: 125,
    color: colors.purple,
    marginBottom: 5,
  },

  button: {
    backgroundColor: colors.white,
    width: 70,
    height: 35,
    marginLeft: 125,
    borderColor: colors.black,
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 30,
  },

  buttonText: {
    color: colors.black,
    fontSize: 15,
  },

  wallet: {
    backgroundColor: colors.purple,
    height: 50,
    borderRadius: 5,
    padding: 10,
    marginBottom: 50,
  },

  saldoText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 20,
    // fontFamily: 'space-mono',
  },

  appWallet: {
    backgroundColor: colors.middlepurple,
    width: 300,
    height: 150,
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },

  walletAvatar: {
    width: 90,
    height: 90,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
  },

  titleText: {
    color: colors.gray,
    fontSize: 18,
    marginLeft: 150,
    marginTop: -120,
    marginBottom: 2,
    // fontFamily: 'space-mono',
  },

  coinText: {
    color: colors.black,
    fontSize: 15,
    marginLeft: 150,
    marginBottom: 2,
    // fontFamily: 'space-mono',
  },

  moneyText: {
    color: colors.purple,
    fontSize: 15,
    marginLeft: 150,
    marginBottom: 2,
    // fontFamily: 'space-mono',
  },

  syncBuda: {
    backgroundColor: colors.purple,
    width: 300,
    height: 50,
    borderRadius: 5,
    padding: 10,
    marginBottom: 50,
  },

  syncSplitwise: {
    backgroundColor: colors.purple,
    width: 300,
    height: 50,
    borderRadius: 5,
    padding: 10,
    marginBottom: 50,
  },
});

export default { ...crossStyles, ...styles };
