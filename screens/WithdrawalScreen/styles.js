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

  cameraContainer: {
    backgroundColor: color.black,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  camera: {
    width: '100%',
    height: '100%',
  },
});

export default { ...crossStyles, ...styles };
