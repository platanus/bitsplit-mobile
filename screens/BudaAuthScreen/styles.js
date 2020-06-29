import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  screen: {
    marginTop: 60,
    margin: 25,
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

  inputText: {
    color: colors.black,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'SpaceMonoRegular',
  },

  button: {
    backgroundColor: colors.white,
    padding: 10,
    marginBottom: 30,
    borderColor: colors.black,
    borderRadius: 10,
    borderWidth: 1.5,
    margin: '3%',
  },

  textButton: {
    padding: 10,
    color: colors.black,
    fontFamily: 'SpaceMonoRegular',
  },

  avatar: {
    marginBottom: 50,
    marginTop: -10,
    marginLeft: '38%',
  },

  errorText: {
    color: colors.red,
    fontSize: 12,
    textAlign: 'center',
    margin: 3,
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
    padding: 5,
    marginVertical: 30,
  },
});
export default { ...crossStyles, ...styles };
