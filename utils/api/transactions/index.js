import env from '../../../env';
import authedAxios from '../authedAxios';

function getBalances() {
  return authedAxios.getInstance().get(`${env.url}/api/v2/balances`);
}

const transactionsApi = {
  getBalances,
};

export default transactionsApi;
