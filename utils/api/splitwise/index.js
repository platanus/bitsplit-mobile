import env from '../../../env';
import authedAxios from '../authedAxios';

function splitwiseDebts() {
  return authedAxios.getInstance().get(`${env.url}/api/v1/splitwise/debts`);
}

function splitwiseAuth() {
  return authedAxios
    .getInstance()
    .post(`${env.url}/api/v1/splitwise/authentications`, {});
}

const splitwise = {
  splitwiseDebts,
  splitwiseAuth,
};
export default splitwise;
