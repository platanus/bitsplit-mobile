import axios from 'axios';
import env from '../../../env';
import authedAxios from '../authedAxios';

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

function fetchUserApi() {
  return authedAxios.getInstance().get(`${env.url}/api/v1/users`);
}

function logoutApi() {
  return authedAxios.getInstance().delete(`${env.url}/api/v1/sessions/`);
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
  return authedAxios.getInstance().patch(`${env.url}/api/v1/users/`, {
    password: payload.password,
    api_key: payload.apiKey,
    api_secret: payload.apiSecret,
  });
}

function userUpdateApi(payload) {
  return authedAxios.getInstance().patch(`${env.url}/api/v1/users/`, {
    ...payload,
  });
}

const authApi = {
  loginApi,
  logoutApi,
  signUpApi,
  budaSyncApi,
  fetchUserApi,
  userUpdateApi,
};
export default authApi;
