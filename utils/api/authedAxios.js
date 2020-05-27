import axios from 'axios';
import { store } from '../../store';

const authedAxios = axios.create();
console.log('ask auth');
if (store) {
  const { auth: { token, user: { email } } } = store.getState();
  console.log('authed', token, email);
  authedAxios.interceptors.request.use(
    config => {
      config.headers['X-User-Token'] = token;
      config.headers['X-User-Email'] = email;
      config.headers['Content-Type'] = 'application/json';

      return config;
    },
    error => Promise.reject(error),
  );
}

export default authedAxios;
