import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import moment from 'moment';
import styles from './styles';
import { usePaymentHistory } from './hooks';
import Header from '../../components/Header';

function PaymentHistoryScreen() {
  const [payments, loading] = usePaymentHistory();

  return (
    <>
      <Header title='Historial de pagos' />
      <ScrollView>
        <View>
          {!loading &&
            payments &&
            payments.map(
              ({
                id,
                amount,
                received,
                created_at,
                sender_email,
                receiver_email,
              }) => (
                <ListItem
                  key={id}
                  title={
                    <Text style={received ? styles.received : styles.sent}>
                      {amount} BTC
                    </Text>
                  }
                  subtitle={getSubtitle(
                    received,
                    created_at,
                    sender_email,
                    receiver_email
                  )}
                  bottomDivider
                />
              )
            )}
        </View>
      </ScrollView>
    </>
  );
}

const getSubtitle = (received, created_at, sender_email, receiver_email) =>
  `${received ? 'Recibido' : 'Enviado'} el ${moment(created_at).format(
    'DD/MM/YY HH:mm'
  )} ${received ? 'de' : 'a'} ${received ? sender_email : receiver_email}`;

export default PaymentHistoryScreen;
