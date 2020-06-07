import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  pinInput: {
    borderWidth: 1,
    width: '90%',
    fontSize: 60,
    borderRadius: 10,
    textAlign: 'center',
  },
  pinContainer: {
    backgroundColor: colors.middlepurple,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  myOverlayContainer: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: colors.middlepurple,
    paddingVertical: '10%',
  },
});
export default { ...crossStyles, ...styles };
