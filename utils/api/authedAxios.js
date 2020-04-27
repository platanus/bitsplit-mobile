import axios from 'axios';
import store from '../../store';

const authedAxios = axios.create();
const state = store.getState();
authedAxios.interceptors.request.use(
  config => {
    config.headers['X-User-Token'] = state.auth.token;
    config.headers['X-User-Email'] = state.auth.user.email;
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  error => Promise.reject(error),
);

export default authedAxios;
