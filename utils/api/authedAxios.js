import axios from 'axios';

// Singleton Pattern
const authedAxios = (() => {
  let axiosObject;
  function createInstance({ email, token }) {
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
    return axiosObject;
  }

  function clear() {
    if (axiosObject) axiosObject = null;
  }

  return { getInstance, clear, createInstance };
})();

export default authedAxios;
