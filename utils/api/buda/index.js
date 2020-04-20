import axios from 'axios';

const url = 'https://pl-bitsplit-staging.herokuapp.com';
function budaBalance(payload) {
  return axios.get(
    `${url}/api/v1/balances`,
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
