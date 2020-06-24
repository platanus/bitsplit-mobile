import React from 'react';
import { ScrollView } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
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
            ({ id, amount_btc, received, created_at, sender, receiver }) => (
              <ListItem
                key={id}
                title={`${amount_btc} BTC`}
                titleStyle={received ? styles.received : styles.sent}
                subtitle={getSubtitle(received, created_at, sender, receiver)}
                bottomDivider
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
                leftAvatar={{
                  source: {
                    uri:
                      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                  },
                }}
                subtitleStyle={{
                  fontFamily: 'SpaceMonoRegular',
                  color: colors.darkpurple,
                  fontSize: 15,
                }}
              />
            )
          )}
        {!loading && (
          <Text style={styles.text}>Por ahora, no tienes transacciones</Text>
        )}
      </ScrollView>
    </>
  );
}

const getSubtitle = (received, created_at, sender, receiver) =>
  `${received ? 'Recibido' : 'Enviado'} el ${moment(created_at).format(
    'DD/MM/YY HH:mm'
  )} ${received ? 'de' : 'a'} ${received ? sender.email : receiver.email}`;

export default PaymentHistoryScreen;
