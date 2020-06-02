import { StyleSheet } from 'react-native';
import crossStyles from '../../styles/CrossStyles';
import colors from '../../styles/colors';
// import * as Font from 'expo-font';

// const getFonts = () => {
//   Font.loadAsync({
//     'space-mono': require('../../assets/font/SpaceMono-Regular.ttf'),
//   });
// };

const styles = StyleSheet.create({
  saldoText: {
    textAlign: 'center',
    fontSize: 30,
    padding: 20,
    // fontFamily: 'space-mono',
  },
  container: {
    marginTop: 50,
  },
});

export default { ...crossStyles, ...styles };
