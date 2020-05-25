import axios from 'axios';
import env from '../../../env';

function loginApi({ email, password }) {
  return axios.post(
    `${env.url}/api/v1/sessions/`,
    {
      user: {
        email,
        password,
      },
    },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

function fetchUserApi({ email, token }) {
  return axios.get(`${env.url}/api/v1/users`, {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': email,
      'X-User-Token': token,
    },
  });
}
function logoutApi({ email, token }) {
  return axios.delete(`${env.url}/api/v1/sessions/`, {
    headers: {
      'Content-Type': 'application/json',
      'X-User-Email': email,
      'X-User-Token': token,
    },
  });
}

function signUpApi(payload) {
  return axios.post(
    `${env.url}/api/v1/users/`,
    { ...payload },
    {
      headers: { 'Content-Type': 'application/json' },
    }
  );
}

function budaSyncApi(payload) {
  return axios.patch(
    `${env.url}/api/v1/users/`,
    {
      password: payload.password,
      api_key: payload.apiKey,
      api_secret: payload.apiSecret,
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

const authApi = { loginApi, logoutApi, signUpApi, budaSyncApi, fetchUserApi };
export default authApi;
