import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text, ListItem } from 'react-native-elements';
import { useListVals } from 'react-firebase-hooks/database';
import { useSelector } from 'react-redux';
import styles from './styles';
// import { useNotifications } from './hooks';
import { database } from '../../utils/firebase/database/config';

// const email = useSelector(state => state.user.email)

function NotificationScreen() {
  const { auth: { user: { email } } } = useSelector(state => state);
  const firebaseEmail = email.replace('.', ',');
  const [notifications, loading] = useListVals(database.ref('notifications').child(`${firebaseEmail}`));

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
