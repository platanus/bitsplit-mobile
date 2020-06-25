import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import color from '../../styles/colors';

const styles = StyleSheet.create({
  screen: {
    marginTop: 60,
    margin: 25,
  },

  image: {
    marginBottom: '10%',
  },

  inputOff: {
    backgroundColor: color.middlepurple,
    padding: 10,
    paddingLeft: 15,
    marginBottom: 30,
    borderStyle: 'solid',
    borderRadius: 15,
    borderBottomWidth: 0,
  },
  inputOn: {
    backgroundColor: color.red,
    padding: 10,
    marginBottom: 30,
    borderStyle: 'solid',
    borderRadius: 15,
    borderBottomWidth: 0,
  },
  inputText: {
    color: color.black,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'SpaceMonoRegular',
  },

  button: {
    backgroundColor: color.white,
    padding: 10,
    marginBottom: 30,
    borderColor: color.black,
    borderRadius: 10,
    borderWidth: 1.5,
  },

  linkText: {
    padding: 10,
    marginBottom: 30,
    textDecorationLine: 'underline',
    color: color.black,
    fontFamily: 'SpaceMonoRegular',
  },

  textButton: {
    padding: 10,
    color: color.black,
    fontFamily: 'SpaceMonoRegular',
  },

  checkBox: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },

  titleText: {
    fontFamily: 'SpaceMonoBold',
    fontSize: 28,
    marginBottom: '2%',
  },

  subtitleText: {
    fontFamily: 'SpaceMonoRegular',
    fontSize: 15,
    marginBottom: '10%',
  },
});

export default { ...crossStyles, ...styles };
