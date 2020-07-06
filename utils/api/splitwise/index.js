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

function paySplitwiseDebt(payload) {
  return authedAxios
    .getInstance()
    .post(`${env.url}/api/v1/splitwise/debts`, payload);
}

const splitwise = {
  splitwiseDebts,
  splitwiseAuth,
  paySplitwiseDebt,
};
export default splitwise;
