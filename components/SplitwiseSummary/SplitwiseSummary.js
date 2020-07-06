import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import formatCurrency from '../../utils/formatCurrency';
import useSplitwiseSummary from './hook';
import styles from './styles';

function SplitwiseSummary() {
  // const {
  //   debtsSummary: { toPay, toCollect },
  // } = useSplitwiseSummary();

  const deudas = useSplitwiseSummary();

  const por_pagar = Math.round(deudas.debtsSummary.toPay.USD);
  const por_recibir = Math.round(deudas.debtsSummary.toCollect.USD);

  return (
    <View style={styles.componentContainer}>
      <Text style={styles.titleText}>Resumen Splitwise</Text>
      <View style={styles.rowContainer}>
        <View style={styles.less}>
          <Text style={styles.coinText}>${por_pagar} CLP</Text>
        </View>
        <View style={styles.plus}>
          <Text style={styles.coinText}>${por_recibir} CLP</Text>
        </View>
      </View>
    </View>
  );
}

export default SplitwiseSummary;
