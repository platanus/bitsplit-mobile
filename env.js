import Constants from 'expo-constants';

const ENV = {
  staging: {
    apiUrl: 'https://pl-bitsplit-staging.herokuapp.com',
  },
  prod: {
    apiUrl: 'https://pl-bitsplit-production.herokuapp.com/',
  },
};

function getEnvVars(env = '') {
  if (env === null || env === undefined || env === '') return ENV.staging;
  if (env.indexOf('prod') !== -1) {
    return ENV.prod;
  }

  return ENV.staging;
}

export default getEnvVars(Constants.manifest.releaseChannel);
