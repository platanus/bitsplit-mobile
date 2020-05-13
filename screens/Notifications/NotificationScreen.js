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
  // const email = useSelector(state => state.user.email);
  // const email = useSelector(state => state.user && state.user.email);
  const firebaseEmail = email.replace('.', ',');
  const [notifications, loading] = useListVals(database.ref('notifications').child(firebaseEmail));
  const dispatch = useDispatch();

  function handleSeen(notificationToken) {
    dispatch({ type: BUDA_NOTIFICATIONS, payload: notificationToken });
  }

  console.log('NOTIFICACIONES', notifications);

  return (
    <ScrollView>
      <View>
        {!loading &&
          notifications.map(
            ({
              seen,
              data,
            }) => (
              <ListItem
                key={data.id}
                title={
                  <Text style={seen ? styles.old : styles.new }>
                    Haz recibido un nuevo pago de {data.amount}
                  </Text>
                }
                onPress ={() => handleSeen(data.id)}
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
