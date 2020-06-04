import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  wallet: {
    backgroundColor: colors.purple,
    height: 50,
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
    marginBottom: 50,
  },

  saldoText: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 20,
  },

  inputOff: {
    backgroundColor: colors.middlepurple,
    padding: 10,
    paddingLeft: 15,
    marginBottom: 30,
    borderStyle: 'solid',
    borderRadius: 15,
    borderBottomWidth: 0,
  },

  button: {
    backgroundColor: colors.white,
    padding: 10,
    marginBottom: 30,
    borderColor: colors.black,
    borderRadius: 10,
    borderWidth: 1.5,
    width: 150,
  },

  textButton: {
    padding: 10,
    color: colors.black,
  },

  titleText: {
    color: colors.gray,
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },

  moneyText: {
    color: colors.purple,
    fontSize: 15,
    marginBottom: 2,
  },

  errorText: {
    color: colors.red,
    fontSize: 12,
    textAlign: 'center',
    margin: 3,
  },

  quotationContainer: {
    margin: 15,
    backgroundColor: colors.middlepurple,
    width: 250,
    height: 150,
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlayContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    marginVertical: 30,
  },
  overlayError: {
    width: 300,
    height: 100,
    maxWidth: '80%',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: colors.purple,
    padding: 5,
    borderRadius: 15,
    marginVertical: 30,
  },

  groupButtonContainer: {
    backgroundColor: colors.middlepurple,
    borderRadius: 5,
    maxWidth: 300,
  },

  groupButton: {
    backgroundColor: colors.purple,
  },
});
export default { ...crossStyles, ...styles };
