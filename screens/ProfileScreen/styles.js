import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

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
  },

  appWallet: {
    backgroundColor: colors.middlepurple,
    width: 300,
    height: 150,
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: colors.black,
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
  },

  coinText: {
    color: colors.black,
    fontSize: 15,
    marginLeft: 150,
    marginBottom: 2,
  },

  syncBuda: {
    width: 110,
    height: 110,
    backgroundColor: colors.purple,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 180,
    marginTop: -100,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },

  syncAvatar: {
    width: 90,
    height: 90,
  },

  syncText: {
    color: colors.gray,
    fontSize: 18,
    marginTop: 10,
    textAlign: 'center',
    width: 120,
    marginLeft: 10,
  },

  syncTextBody: {
    color: colors.purple,
    fontSize: 15,
    marginTop: 10,
    marginBottom: 2,
    textAlign: 'center',
    width: 120,
    marginLeft: 10,
  },
});

export default { ...crossStyles, ...styles };
