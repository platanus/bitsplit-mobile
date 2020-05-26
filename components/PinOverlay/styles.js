import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';

const styles = StyleSheet.create({
  pinInput: {
    borderWidth: 1,
    width: '90%',
    fontSize: 60,
    borderRadius: 10,
    textAlign: 'center',
  },
  pinContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

});
export default { ...crossStyles, ...styles };
