import React, { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Text, ListItem, ThemeProvider } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import { useListVals } from 'react-firebase-hooks/database';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import styles from './styles';
import {
  FIREBASE_NOTIFICATIONS,
  GET_WALLETS_BALANCES,
} from '../../store/types';
import { database } from '../../utils/firebase/database/config';
import Header from '../../components/Header';
import Theme from '../../styles/Theme';

export const useNotifications = () => {
  const {
    auth: {
      user: { email },
    },
  } = useSelector(state => state);
  const firebaseEmail = email.replace('.', ',');
  const [notifications, loading] = useListVals(
    database.ref('notifications').child(firebaseEmail),
    { keyField: 'token' }
  );
  const dispatch = useDispatch();
  const total = notifications && notifications.length;
  useEffect(() => {
    dispatch({ type: GET_WALLETS_BALANCES });
  }, [total, dispatch]);

  return [notifications, loading];
};

function NotificationScreen() {
  const [notifications, loading] = useNotifications();
  const dispatch = useDispatch();

  function handleSeen(notificationToken) {
    dispatch({ type: FIREBASE_NOTIFICATIONS, payload: notificationToken });
  }

  return (
    <>
      <Header title='Notificaciones' />
      <ThemeProvider theme={Theme}>
        <ScrollView>
          {!loading &&
            notifications &&
            notifications.map(({ seen, data, token }) => (
              <ListItem
                key={token}
                title={`Te pagaron ${data.amount} BTC`}
                titleStyle={seen ? styles.old : styles.new}
                subtitle={getSubtitle(seen, data)}
                onPress={() => handleSeen(token)}
                bottomDivider
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
              />
            ))}

          {!loading && (
            <Text style={styles.text}>Por ahora no tienes notificaciones</Text>
          )}
        </ScrollView>
      </ThemeProvider>
    </>
  );
}

const getSubtitle = (seen, data) =>
  `Fecha: ${moment(data.created_at).format('DD/MM/YY HH:mm')} de ${
    data.sender
  }`;

export default NotificationScreen;
