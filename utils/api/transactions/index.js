import env from '../../../env';
import authedAxios from '../authedAxios';

function getBalances() {
  return authedAxios.getInstance().get(`${env.url}/api/v2/balances`);
}

function transactionsHistory() {
  return authedAxios.getInstance().get(`${env.url}/api/v2/transactions`);
}

function userExists(email) {
  return authedAxios
    .getInstance()
    .post(`${env.url}/api/v2/user_exists`, { email });
}

const transactionsApi = {
  getBalances,
  transactionsHistory,
  userExists,
};

export default transactionsApi;
