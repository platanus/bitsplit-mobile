import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import color from '../../styles/colors';

const styles = StyleSheet.create({
  screen: {
    marginTop: 10,
    margin: 10,
  },

  inputOff: {
    backgroundColor: color.middlepurple,
    padding: 5,
    borderStyle: 'solid',
    borderRadius: 15,
    borderBottomWidth: 0,
    margin: 10,
  },

  button: {
    backgroundColor: color.darkpurple,
    padding: 10,
    borderColor: color.black,
    borderRadius: 10,
    borderWidth: 1.5,
    margin: 22,
  },

  inputText: {
    color: color.black,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'SpaceMonoRegular',
  },

  textButton: {
    padding: 10,
    color: color.lightpurple,
    fontFamily: 'SpaceMonoRegular',
  },
  groupButton: {
    backgroundColor: color.darkpurple,
  },

  text: {
    padding: 10,
    color: color.darkpurple,
    fontFamily: 'SpaceMonoRegular',
    textAlign: 'center',
  },

  errorText: {
    color: color.red,
    fontSize: 13,
    textAlign: 'center',
  },

  overlayError: {
    backgroundColor: color.lightpurple,
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
});

export default { ...crossStyles, ...styles };
