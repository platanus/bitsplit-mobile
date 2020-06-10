import axios from 'axios';
import { store } from '../../store';

// Singleton Pattern
const authedAxios = (() => {
  let axiosObject;
  function createInstance() {
    const {
      auth: { token, user: { email } = { email: false } },
    } = store.getState();
    if (token && email) {
      axiosObject = axios.create();
      axiosObject.interceptors.request.use(
        config => {
          config.headers['X-User-Token'] = token;
          config.headers['X-User-Email'] = email;
          config.headers['Content-Type'] = 'application/json';

          return config;
        },
        error => Promise.reject(error)
      );
    }

    return axiosObject;
  }

  function getInstance() {
    if (!axiosObject) {
      return createInstance();
    }

    return axiosObject;
  }

  function clear() {
    if (axiosObject) axiosObject = null;
  }

  return { getInstance, clear };
})();

export default authedAxios;
