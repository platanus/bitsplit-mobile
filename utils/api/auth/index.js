import axios from 'axios';
import env from '../../../env';
import authedAxios from '../authedAxios';

function loginApi(payload) {
  return axios.post(
    `${env.url}/api/v1/sessions/`,
    {
      email: payload.email,
      password: payload.password,
    },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
}

const logoutApi = () => authedAxios.delete('/api/v1/sessions');
function logoutApiOld({ email, token }) {
  return axios.delete(
    `${env.url}/api/v1/sessions/`,
    {
      headers: { 'Content-Type': 'application/json',
        'X-User-Email': email,
        'X-User-Token': token,
      },
    },
  );
}

function signUpApi(payload) {
  return axios.post(
    `${env.url}/api/v1/users/`,
    { ...payload },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );
}

function budaSyncApi(payload) {
  return axios.patch(
    `${env.url}/api/v1/users/`,
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

const authApi = { loginApi, logoutApi, signUpApi, budaSyncApi };
export default authApi;
