import axios from 'axios';
import env from '../../../env';

function budaBalance(payload) {
  return axios.get(
    `${env.url}/api/v1/balances`,
    {
      headers: { 'Content-Type': 'application/json',
        'X-User-Email': payload.email,
        'X-User-Token': payload.token,
      },
    },
  );
}

const budaApi = { budaBalance };
export default budaApi;
