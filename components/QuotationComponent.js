import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

const QuotationComponent = ({
  style,
  isValidQuotation,
  totalClp,
  totalBitcoins,
  fee = null,
}) => {
  return (
    <View style={style}>
      {isValidQuotation ? (
        <View>
          <Text h4>Cotizacion</Text>
          <Text>Monto total CLP: ${totalClp}</Text>
          <Text>Monto total BTC: ${totalBitcoins}</Text>
          {fee === null ? <Text /> : <Text>Costo por servicio: ${fee}</Text>}
        </View>
      ) : (
        <Text h4>Para poder hacer una conversión, lo mínimo es $100 CLP</Text>
      )}
    </View>
  );
};

export default QuotationComponent;
