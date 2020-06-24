import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  received: {
    color: colors.lightgreen,
    fontSize: 18,
    fontFamily: 'SpaceMonoRegular',
  },
  sent: {
    color: colors.lightred,
    fontSize: 18,
    fontFamily: 'SpaceMonoRegular',
  },
  text: {
    fontSize: 20,
    margin: 50,
    marginTop: 200,
    fontFamily: 'SpaceMonoRegular',
    textAlign: 'center',
  },
});
export default { ...crossStyles, ...styles };
