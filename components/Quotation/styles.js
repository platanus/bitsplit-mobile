import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import color from '../../styles/colors';

const styles = StyleSheet.create({
  quotationContainer: {
    backgroundColor: color.middlepurple,
    margin: 22,
    padding: 15,
    height: '25%',
    borderRadius: 20,
    shadowColor: color.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleQuotation: {
    color: color.darkpurple,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'SpaceMonoBoldItalic',
  },

  textQuotation: {
    color: color.purple,
    fontSize: 15,
    textAlign: 'center',
    margin: 3,
    fontFamily: 'SpaceMonoRegular',
  },
});

export default { ...crossStyles, ...styles };
