import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

import formatCurrency from '../../utils/formatCurrency';
import useSplitwiseSummary from './hook';
import styles from './styles';

function SplitwiseSummary() {
  const {
    debtsSummary: { toPay, toCollect },
  } = useSplitwiseSummary();

  return (
    <View style={styles.componentContainer}>
      <Text style={styles.titleText}>Resumen Splitwise</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={styles.toCollectTitle}>x Cobrar</Text>
          {Object.keys(toCollect)
            .sort()
            .map(currency => (
              <Text key={currency} style={styles.coinText}>{` ${formatCurrency(
                toCollect[currency],
                currency
              )}`}</Text>
            ))}
        </View>
        <View>
          <Text style={styles.toPayTitle}>x Pagar</Text>
          {Object.keys(toPay)
            .sort()
            .map(currency => (
              <Text key={currency} style={styles.coinText}>{`${formatCurrency(
                toPay[currency],
                currency
              )}`}</Text>
            ))}
        </View>
      </View>
    </View>
  );
}

export default SplitwiseSummary;
