import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './styles';

const QuotationComponent = ({
  style,
  isValidQuotation,
  totalClp,
  totalBitcoins,
  fee = null,
}) => (
  <View style={styles.quotationContainer}>
    {isValidQuotation ? (
      <View>
        <Text style={styles.titleQuotation}>Cotizacion</Text>
        <Text style={styles.textQuotation}>CLP: ${totalClp}</Text>
        <Text style={styles.textQuotation}>BTC: ${totalBitcoins}</Text>
        {fee === null ? (
          <Text />
        ) : (
          <Text style={styles.textQuotation}>Costo por servicio: ${fee}</Text>
        )}
      </View>
    ) : (
      <Text style={styles.textQuotation}>
        Para poder hacer una conversión, lo mínimo es $100 CLP
      </Text>
    )}
  </View>
);

export default QuotationComponent;
