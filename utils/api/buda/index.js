import env from '../../../env';
import authedAxios from '../authedAxios';

function budaBalance() {
  return authedAxios.getInstance().get(`${env.url}/api/v1/balances`);
}

function budaGetQuotationApi(payload) {
  return authedAxios.getInstance().post(`${env.url}/api/v1/quotations/`, {
    amount: payload.amount,
  });
}

function budaPaymentApi(payload) {
  return authedAxios.getInstance().post(`${env.url}/api/v1/payments`, {
    payment_amount: payload.amountBtc,
    receiver_email: payload.receptor,
  });
}

function budaPaymentHistoryApi() {
  return authedAxios.getInstance().get(`${env.url}/api/v1/payments`);
}

const budaApi = {
  budaBalance,
  budaGetQuotationApi,
  budaPaymentApi,
  budaPaymentHistoryApi,
};
export default budaApi;
