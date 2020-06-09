import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  pinOverlayContainer: {
    alignItems: 'center',
    backgroundColor: '#25035A',
  },

  pinView: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },

  container: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    color: colors.white,
    fontSize: 30,
  },

  inputText: {
    backgroundColor: colors.middlepurple,
    width: 250,
    height: 60,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 30,
    color: colors.black,
    fontSize: 30,
    fontWeight: 'bold',
    borderRadius: 30,
  },

  errorText: {
    color: colors.red,
    fontSize: 15,
    marginTop: 200,
  },

  image: {
    width: 250,
    height: 60,
  },
});

export default { ...crossStyles, ...styles };
