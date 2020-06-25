import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text, ListItem, ThemeProvider } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import { useListVals } from 'react-firebase-hooks/database';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import styles from './styles';
import { FIREBASE_NOTIFICATIONS } from '../../store/types';
import { database } from '../../utils/firebase/database/config';
import Header from '../../components/Header';
import Theme from '../../styles/Theme';

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
      <Header title='Notificaciones' />
      <ThemeProvider theme={Theme}>
        <ScrollView>
          {!loading &&
            notifications &&
            notifications.map(({ seen, data, token }) => (
              <ListItem
                key={token}
                title={`${data.amount} BTC`}
                titleStyle={seen ? styles.old : styles.new}
                subtitle={getSubtitle(seen, data)}
                onPress={() => handleSeen(token)}
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
  `Fecha: ${moment(data.created_at).format('DD/MM/YY HH:mm')}`;

export default NotificationScreen;
