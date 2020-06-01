import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text, ListItem } from 'react-native-elements';
import { useListVals } from 'react-firebase-hooks/database';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { FIREBASE_NOTIFICATIONS } from '../../store/types';
import { database } from '../../utils/firebase/database/config';
import Header from '../../components/Header';

function NotificationScreen() {
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

  function handleSeen(notificationToken) {
    dispatch({ type: FIREBASE_NOTIFICATIONS, payload: notificationToken });
  }

  return (
    <>
      <Header title='Notificationes' />
      <ScrollView>
        <View>
          {!loading &&
            notifications &&
            notifications.map(({ seen, data, token }) => (
              <ListItem
                key={data.id}
                title={
                  <Text style={seen ? styles.old : styles.new}>
                    Haz recibido un nuevo pago de {data.amount}
                  </Text>
                }
                onPress={() => handleSeen(token)}
                bottomDivider
              />
            ))}

          {!loading && (
            <Text style={styles.text}>
              {' '}
              Por ahora, no tienes notificaciones
            </Text>
          )}
        </View>
      </ScrollView>
    </>
  );
}

export default NotificationScreen;
