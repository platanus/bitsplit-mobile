import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import authedAxios from './authedAxios';
import env from '../../env';

function addToken(token) {
  return authedAxios.getInstance().post(
    `${env.url}/api/v2/push_notifications`,
    { token },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

export const registerForPushNotifications = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }
    const token = await Notifications.getExpoPushTokenAsync();
    await addToken(token);
  }
};
