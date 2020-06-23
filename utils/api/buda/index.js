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
  return authedAxios.getInstance().post(`${env.url}/api/v2/transfers`, {
    amount: payload.amountBtc,
    receiver_email: payload.receptor,
    wallet_origin: payload.wallet,
  });
}

function bitSplitWithdrawalApi(payload) {
  return authedAxios.getInstance().post(`${env.url}/api/v2/withdrawals`, {
    invoice: payload.invoice,
  });
}

function bitSplitDepositApi(payload) {
  return authedAxios.getInstance().post(`${env.url}/api/v2/deposits`, {
    amount: payload.amountBtc,
    currency: 'BTC',
  });
}

const budaApi = {
  budaBalance,
  budaGetQuotationApi,
  budaPaymentApi,
  bitSplitWithdrawalApi,
  bitSplitDepositApi,
};
export default budaApi;
