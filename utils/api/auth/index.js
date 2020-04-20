import axios from 'axios';

const url = 'https://pl-bitsplit-staging.herokuapp.com';
function loginApi(payload) {
  return axios.post(
    `${url}/api/v1/sessions/`,
    {
      email: payload.email,
      password: payload.password,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
}

function signUpApi(payload) {
  return axios.post(
    `${url}/api/v1/users/`,
    { ...payload },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
}

function budaSyncApi(payload) {
  return axios.patch(
    `${url}/api/v1/users/`,
    {
      'password': payload.password,
      'api_key': payload.apiKey,
      'api_secret': payload.apiSecret,
    },
    {
      headers: { 'Content-Type': 'application/json',
        'X-User-Email': payload.email,
        'X-User-Token': payload.token,
      },
    },
  );
}

const authApi = { loginApi, signUpApi, budaSyncApi };
export default authApi;
