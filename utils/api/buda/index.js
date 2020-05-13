import axios from 'axios';
import env from '../../../env';

function budaBalance(payload) {
  return axios.get(
    `${env.url}/api/v1/balances`, {
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': payload.email,
        'X-User-Token': payload.token,
      },
    },
  );
}

function budaGetQuotationApi(payload) {
  return axios.post(
    `${env.url}/api/v1/quotations/`, {
      amount: payload.amount,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': payload.email,
        'X-User-Token': payload.token,
      },

    },
  );
}

function budaPaymentApi(payload) {
  return axios.post(
    `${env.url}/api/v1/payments`, {
      'payment_amount': payload.amountBtc,
      'receiver_email': payload.receptor,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': payload.email,
        'X-User-Token': payload.token,
      },

    },
  );
}

function budaPaymentHistoryApi(payload) {
  return axios.get(
    `${env.url}/api/v1/payments`, {
      headers: {
        'Content-Type': 'application/json',
        'X-User-Email': payload.email,
        'X-User-Token': payload.token,
      },

    },
  );
}

function budaNotification(payload) {
  return axios.patch(
    `${env.url}/api/v1/firebase`,
    {
      'notification_token': payload.notification_token,
    },
    {
      headers: { 'Content-Type': 'application/json',
        'X-User-Email': payload.email,
        'X-User-Token': payload.token,
      },
    },
  );
}

const budaApi = {
  budaBalance,
  budaGetQuotationApi,
  budaPaymentApi,
  budaPaymentHistoryApi,
  budaNotification,
};
export default budaApi;
