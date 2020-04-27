import axios from 'axios';
import authedAxios from '../authedAxios';
import env from '../../../env';

function budaBalance(payload) {
  console.log('test');

  return authedAxios.get(`${env.url}/api/v1/balances`);
}

function budaGetQuotationApi(payload) {
  return axios.post(
    `${env.url}/api/v1/quotations/`,
    {
      amount: payload.amount,
    },
    {
      headers: { 'Content-Type': 'application/json',
        'X-User-Email': payload.email,
        'X-User-Token': payload.token,
      },

    },
  );
}

function budaPaymentApi(payload) {
  return axios.post(
    `${env.url}/api/v1/payments`,
    {
      'payment_amount': payload.amountBtc,
      'receiver_email': payload.receptor,
    },
    {
      headers: { 'Content-Type': 'application/json',
        'X-User-Email': payload.email,
        'X-User-Token': payload.token,
      },

    },
  );
}

const budaApi = { budaBalance, budaGetQuotationApi, budaPaymentApi };
export default budaApi;
