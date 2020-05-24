import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text, ListItem } from 'react-native-elements';
import { useListVals } from 'react-firebase-hooks/database';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { BUDA_NOTIFICATIONS } from '../../store/types';
import { database } from '../../utils/firebase/database/config';

function NotificationScreen() {
  const { auth: { user: { email } } } = useSelector(state => state);
  const firebaseEmail = email.replace('.', ',');
  const [notifications, loading] = useListVals(database.ref('notifications').child(firebaseEmail), { keyField: 'token' });
  const dispatch = useDispatch();

  function handleSeen(notificationToken) {
    dispatch({ type: BUDA_NOTIFICATIONS, payload: notificationToken });
  }

  return (
    <ScrollView>
      <View>
        {!loading && notifications &&
          notifications.map(
            ({
              seen,
              data,
              token,
            }) => (
              <ListItem
                key={data.id}
                title={
                  <Text style={seen ? styles.old : styles.new }>
                    Haz recibido un nuevo pago de {data.amount}
                  </Text>
                }
                onPress ={() => handleSeen(token)}
                bottomDivider
              />
            ),
          )}
      </View>
    </ScrollView>
  );
}

NotificationScreen.navigationOptions = (navData) => ({
  headerTitle: 'Notificaciones',
  headerLeft: () => (
    <Button
      onPress={() => {
        navData.navigation.toggleDrawer();
      }}
    />
  ),
});

export default NotificationScreen;
