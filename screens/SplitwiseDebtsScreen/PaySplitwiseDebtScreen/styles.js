import { StyleSheet } from 'react-native';
import crossStyles from '../../../styles/CrossStyles';
import color from '../../../styles/colors';

const styles = StyleSheet.create({
  container: {
    margin: '5%',
    marginTop: '10%',
    padding: '10%',
    borderRadius: 10,
    elevation: 3,
    backgroundColor: color.white,
  },

  title: {
    fontFamily: 'SpaceMonoRegular',
    fontSize: 20,
    textAlign: 'center',
    color: color.purple,
  },

  money: {
    fontFamily: 'SpaceMonoBold',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: '10%',
    color: color.darkpurple,
  },

  moneyBTC: {
    fontFamily: 'SpaceMonoBold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: '10%',
    color: color.darkpurple,
  },

  user1: {
    fontFamily: 'SpaceMonoRegular',
    fontSize: 15,
    textAlign: 'center',
    color: color.purple,
  },

  user2: {
    fontFamily: 'SpaceMonoRegular',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: '10%',
    color: color.purple,
  },

  error: {
    fontFamily: 'SpaceMonoRegular',
    fontSize: 10,
    textAlign: 'center',
    marginBottom: '5%',
    color: color.red,
  },

  button: {
    backgroundColor: color.darkpurple,
  },

  textButton: {
    color: color.lightpurple,
    fontFamily: 'SpaceMonoRegular',
  },
});
export default { ...crossStyles, ...styles };
