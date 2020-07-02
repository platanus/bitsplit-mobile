import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  screen: {
    marginTop: 30,
    margin: 15,
  },

  saldoText: {
    color: colors.darkpurple,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: '5%',
    fontFamily: 'SpaceMonoBoldItalic',
  },

  inputText: {
    color: colors.black,
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'SpaceMonoRegular',
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
  errorText: {
    color: colors.red,
    fontSize: 13,
    textAlign: 'center',
  },

  overlayError: {
    backgroundColor: colors.lightpurple,
    width: 300,
    height: 100,
    maxWidth: '80%',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
  },

  groupButtonContainer: {
    backgroundColor: colors.middlepurple,
    borderRadius: 5,
    maxWidth: '100%',
  },

  groupButton: {
    backgroundColor: colors.darkpurple,
  },

  button: {
    backgroundColor: colors.darkpurple,
    padding: 10,
    borderColor: colors.black,
    borderRadius: 10,
    borderWidth: 1.5,
    margin: 22,
  },

  textButton: {
    padding: 10,
    color: colors.lightpurple,
    fontFamily: 'SpaceMonoRegular',
  },
});
export default { ...crossStyles, ...styles };
