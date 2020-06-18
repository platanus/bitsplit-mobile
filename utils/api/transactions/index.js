import env from '../../../env';
import authedAxios from '../authedAxios';

function getBalances() {
  return authedAxios.getInstance().get(`${env.url}/api/v2/balances`);
}

function transactionsHistory() {
  return authedAxios.getInstance().get(`${env.url}/api/v2/transactions`);
}

const transactionsApi = {
  getBalances,
  transactionsHistory,
};

export default transactionsApi;
