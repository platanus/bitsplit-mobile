import env from '../../../env';
import authedAxios from '../authedAxios';

function firebaseNotification(payload) {
  return authedAxios.getInstance().patch(`${env.url}/api/v1/firebase`, {
    notification_token: payload.notification_token,
  });
}

const firebase = {
  firebaseNotification,
};
export default firebase;
