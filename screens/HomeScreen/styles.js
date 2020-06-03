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
    marginTop: -100,
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
    marginBottom: 3,
  },

  button: {
    backgroundColor: colors.white,
    width: 70,
    height: 30,
    padding: 10,
    marginLeft: 125,
    borderColor: colors.black,
    borderRadius: 5,
    borderWidth: 1.5,
    marginBottom: 30,
  },

  wallet: {
    backgroundColor: colors.purple,
    width: 300,
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

  budaWallet: {
    backgroundColor: colors.purple,
    width: 300,
    height: 50,
    borderRadius: 5,
    padding: 10,
    marginBottom: 50,
  },

  splitwiseWallet: {
    backgroundColor: colors.purple,
    width: 300,
    height: 50,
    borderRadius: 5,
    padding: 10,
    marginBottom: 50,
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
