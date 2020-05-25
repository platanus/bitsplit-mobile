import axios from 'axios';
import env from '../../../env';

function firebaseNotification(payload) {
  return axios.patch(
    `${env.url}/api/v1/firebase`,
    {
      notification_token: payload.notification_token,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': payload.email,
        'X-User-Token': payload.token,
      },
    }
  );
}

const firebase = {
  firebaseNotification,
};
export default firebase;
