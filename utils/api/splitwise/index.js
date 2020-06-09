import env from '../../../env';
import authedAxios from '../authedAxios';

function splitwiseDebts() {
  return authedAxios.getInstance().get(`${env.url}/api/v1/splitwise/debts`);
}

const splitwise = {
  splitwiseDebts,
};
export default splitwise;
