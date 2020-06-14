import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import moment from 'moment';
import styles from './styles';
import { usePaymentHistory } from './hooks';
import Header from '../../components/Header';
import colors from '../../styles/colors';

function PaymentHistoryScreen() {
  const [payments, loading] = usePaymentHistory();

  return (
    <>
      <Header title='Historial de pagos' />
      <ScrollView>
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
                title={amount}
                titleStyle={received ? styles.received : styles.sent}
                subtitle={getSubtitle(
                  received,
                  created_at,
                  sender_email,
                  receiver_email
                )}
                bottomDivider
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
                containerStyle={received ? styles.received : styles.sent}
                subtitleStyle={{
                  fontFamily: 'SpaceMonoRegular',
                  color: colors.darkpurple,
                  fontSize: 15,
                }}
              />
            )
          )}
      </ScrollView>
    </>
  );
}

const getSubtitle = (received, created_at, sender_email, receiver_email) =>
  `${received ? 'Recibido' : 'Enviado'} el ${moment(created_at).format(
    'DD/MM/YY HH:mm'
  )} ${received ? 'de' : 'a'} ${received ? sender_email : receiver_email}`;

export default PaymentHistoryScreen;
