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
    fontSize: 15,
    marginLeft: 125,
    marginTop: -90,
    marginBottom: 2,
  },

  emailText: {
    fontSize: 13,
    marginLeft: 125,
    marginBottom: 5,
  },

  walletText: {
    fontSize: 13,
    marginLeft: 125,
    color: colors.purple,
    marginBottom: '15%',
  },

  button: {
    backgroundColor: colors.darkpurple,
    padding: 10,
    borderColor: colors.black,
    borderRadius: 10,
    borderWidth: 1.5,
  },

  textButton: {
    padding: 10,
    color: colors.lightpurple,
  },

  syncButton: {
    backgroundColor: colors.darkpurple,
    padding: 10,
    borderColor: colors.black,
    borderRadius: 10,
    borderWidth: 1.5,
    width: '80%',
    height: '15%',
    marginTop: '5%',
    margin: '11%',
  },

  syncTextButton: {
    color: colors.lightpurple,
    fontSize: 10,
    textAlign: 'center',
    marginTop: '-18%',
  },

  appWallet: {
    backgroundColor: colors.middlepurple,
    width: 300,
    height: 160,
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
    marginLeft: '40%',
  },

  titleText: {
    color: colors.purple,
    fontSize: 15,
    marginTop: '5%',
    textAlign: 'center',
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
