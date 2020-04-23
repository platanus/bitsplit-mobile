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

const api = { loginApi, signUpApi };
export default api;
