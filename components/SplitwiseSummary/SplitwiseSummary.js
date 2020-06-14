import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';
import formatCurrency from '../../utils/formatCurrency';
import useSplitwiseSummary from './hook';
import styles from './styles';

function SplitwiseSummary() {
  const {
    debtsSummary: { toPay, toCollect },
  } = useSplitwiseSummary();

  const [fontsLoaded] = useFonts({
    SpaceMonoItalic: require('../../assets/fonts/SpaceMono-BoldItalic.ttf'),
    SpaceMonoRegular: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.componentContainer}>
      <Text
        style={{ ...styles.titleText, ...{ fontFamily: 'SpaceMonoRegular' } }}
      >
        Resumen Splitwise
      </Text>
      <View style={styles.rowContainer}>
        <View style={styles.less}>
          {Object.keys(toPay)
            .sort()
            .map(currency => (
              <Text
                key={currency}
                style={{
                  ...styles.coinText,
                  ...{ fontFamily: 'SpaceMonoRegular' },
                }}
              >{`${formatCurrency(toPay[currency], currency)}`}</Text>
            ))}
        </View>
        <View style={styles.plus}>
          {Object.keys(toCollect)
            .sort()
            .map(currency => (
              <Text
                key={currency}
                style={{
                  ...styles.coinText,
                  ...{ fontFamily: 'SpaceMonoRegular' },
                }}
              >{` ${formatCurrency(toCollect[currency], currency)}`}</Text>
            ))}
        </View>
      </View>
    </View>
  );
}

export default SplitwiseSummary;
