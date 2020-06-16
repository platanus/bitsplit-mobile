import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import styles from './styles';
import colors from '../../styles/colors';

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
        <Text
          style={{
            ...styles.titleQuotation,
            ...{ fontFamily: 'SpaceMonoItalic' },
          }}
        >
          Cotizacion
        </Text>
        <Text
          style={{
            ...styles.textQuotation,
            ...{ fontFamily: 'SpaceMonoRegular' },
          }}
        >
          CLP: ${totalClp}
        </Text>
        <Text
          style={{
            ...styles.textQuotation,
            ...{ fontFamily: 'SpaceMonoRegular' },
          }}
        >
          BTC: ${totalBitcoins}
        </Text>
        {fee === null ? (
          <Text />
        ) : (
          <Text
            style={{
              ...styles.textQuotation,
              ...{ fontFamily: 'SpaceMonoRegular' },
            }}
          >
            Costo por servicio: ${fee}
          </Text>
        )}
      </View>
    ) : (
      <Text
        style={{
          ...styles.textQuotation,
          ...{ fontFamily: 'SpaceMonoRegular' },
        }}
      >
        Para poder hacer una conversión, lo mínimo es $100 CLP
      </Text>
    )}
  </View>
);

export default QuotationComponent;
