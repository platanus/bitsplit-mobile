import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  screen: {
    marginTop: 30,
    margin: 30,
  },

  avatar: {
    width: 110,
    height: 110,
  },

  nameText: {
    fontSize: 15,
    marginLeft: 125,
    marginTop: -90,
    marginBottom: 2,
    fontFamily: 'SpaceMonoRegular',
  },

  emailText: {
    fontSize: 13,
    marginLeft: 125,
    marginBottom: 5,
    fontFamily: 'SpaceMonoRegular',
  },

  walletText: {
    fontSize: 13,
    marginLeft: 125,
    color: colors.purple,
    marginBottom: '15%',
    fontFamily: 'SpaceMonoRegular',
  },

  button: {
    backgroundColor: colors.darkpurple,
    padding: 10,
    borderColor: colors.black,
    borderRadius: 10,
    borderWidth: 1.5,
    marginTop: 20,
    marginBottom: 10,
  },

  textButton: {
    color: colors.lightpurple,
    fontFamily: 'SpaceMonoRegular',
    textAlign: 'center',
  },

  budaIcon: {
    marginLeft: '20%',
  },

  splitwiseIcon: {
    marginTop: '-25%',
    marginLeft: '56%',
    marginBottom: '10%',
  },

  groupButtonContainer: {
    backgroundColor: colors.middlepurple,
    borderRadius: 5,
    maxWidth: '100%',
  },

  groupButton: {
    backgroundColor: colors.darkpurple,
  },

  input: {
    marginTop: '40%',
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
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'SpaceMonoRegular',
  },
});

export default { ...crossStyles, ...styles };
