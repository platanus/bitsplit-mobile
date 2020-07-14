/* eslint-disable max-statements */
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions as budaActions } from './slice';
import {
  BUDA_AUTH_REQUEST,
  BUDA_GET_BALANCE,
  BUDA_QUOTATION,
  BUDA_PAYMENT,
  BITSPLIT_WITHDRAWAL,
  BITSPLIT_DEPOSIT,
} from '../types';
import api from '../../utils/api';

function* syncBudaRequest(action) {
  yield put(budaActions.start());
  try {
    // eslint-disable-next-line camelcase
    const {
      data: {
        data: {
          attributes: { api_key },
        },
      },
    } = yield call(api.budaSyncApi, { ...action.payload });
    const {
      data: {
        data: { error, balance },
      },
    } = yield call(api.budaBalance);
    if (error) {
      yield put(budaActions.syncBudaRejected(error.message));
    } else {
      const { callback = () => {} } = action;
      yield put(budaActions.budaBalance(balance));
      yield put(budaActions.setBudaKey(api_key));
      callback();
    }
  } catch (err) {
    yield put(budaActions.syncBudaRejected('tus credenciales son invalidas'));
  }
  yield put(budaActions.finish());
}

export function* getBudaBalance() {
  yield put(budaActions.start());
  try {
    const {
      data: {
        data: { error, balance },
      },
    } = yield call(api.budaBalance);
    if (error) {
      yield put(budaActions.setBudaKey(null));
      yield put(budaActions.syncBudaRejected(error.message));
    } else {
      yield put(budaActions.budaBalance(balance));
    }
  } catch (err) {
    yield put(budaActions.syncBudaRejected('tus credenciales son invalidas'));
  }
  yield put(budaActions.finish());
}

function* getBudaQuotation(action) {
  yield put(budaActions.start());
  try {
    const {
      data: {
        data: { quotation },
      },
    } = yield call(api.budaGetQuotationApi, {
      amount: action.payload,
    });
    yield put(budaActions.setQuotations(quotation));
  } catch (err) {
    yield put(budaActions.syncBudaRejected(err));
  }
  yield put(budaActions.finish());
}

function* postBudaPayment(action) {
  yield put(budaActions.start());
  try {
    const {
      data: {
        data: { error, payment },
      },
    } = yield call(api.budaPaymentApi, { ...action.payload });
    yield put(
      budaActions.setLastPayment({
        receiver_email: action.payload.receptor,
        amount: action.payload.amountBtc,
      })
    );
    if (error) {
      yield put(budaActions.syncBudaRejected(error));
    } else if (action.callback) {
      action.callback();
    }
  } catch (err) {
    yield put(budaActions.syncBudaRejected('Hubo un error en el pago'));
  }
  yield put(budaActions.finish());
}

function* postWithdrawal(action) {
  const JS_MILISEC = 1000;
  const BTC_TO_SAT = 100000000; // 1 BTC = 100,000,000 SAT
  const DATE_OPTIONS = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  yield put(budaActions.start());
  try {
    if (action.payload.withdrawalMethod === 'buda') {
      const {
        data: { invoice },
      } = yield call(api.budaAutoWithdrawalApi, { ...action.payload });
      if (invoice !== null) {
        action.payload.invoice = invoice;
      }
    }
    const {
      data: {
        data: { response },
      },
    } = yield call(api.bitSplitWithdrawalApi, { ...action.payload });
    if (response.data) {
      yield put(
        budaActions.setLastWithdrawal({
          amount: response.data.amount / BTC_TO_SAT,
          processed_at: new Date(
            response.data.processed_at * JS_MILISEC
          ).toLocaleDateString('es-ES', DATE_OPTIONS),
        })
      );
      yield put(budaActions.syncReturnMessage('Transacción en proceso'));
      yield put(budaActions.syncBudaRejected(null));
      action.callback();
    } else {
      yield put(budaActions.syncBudaRejected(response.message));
    }
  } catch (err) {
    yield put(budaActions.syncBudaRejected('Hubo un error en el retiro'));
  }
  yield put(budaActions.finish());
}

function* postDeposit(action) {
  const JS_MILISEC = 1000;
  const BTC_TO_SAT = 100000000; // 1 BTC = 100,000,000 SAT
  const DATE_OPTIONS = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  yield put(budaActions.start());
  try {
    const {
      data: {
        data: { response },
      },
    } = yield call(api.bitSplitDepositApi, { ...action.payload });
    if (response.data) {
      const {
        amount,
        processed_at,
        lightning_invoice: { expires_at, payreq },
      } = response.data;
      if (action.payload.depositMethod === 'buda') {
        const {
          data: {
            data: {
              attributes: { withdrawal },
            },
          },
        } = yield call(api.budaAutoDepositApi, {
          payreq: response.data.lightning_invoice.payreq,
          orderId: response.data.order_id,
        });
        yield put(
          budaActions.setLastDeposit({
            amount: amount / BTC_TO_SAT,
            processed_at: new Date(withdrawal.created_at).toLocaleDateString(
              'es-ES',
              DATE_OPTIONS
            ),
            expires_at: null,
            payreq: withdrawal.withdrawal_data.payment_request,
          })
        );
        yield put(budaActions.syncReturnMessage('Tu dinero será depositado'));
      } else {
        yield put(
          budaActions.setLastDeposit({
            amount: amount / BTC_TO_SAT,
            processed_at: new Date(
              processed_at * JS_MILISEC
            ).toLocaleDateString('es-ES', DATE_OPTIONS),
            expires_at: new Date(expires_at * JS_MILISEC).toLocaleDateString(
              'es-ES',
              DATE_OPTIONS
            ),
            payreq,
          })
        );
        yield put(budaActions.syncReturnMessage('Transacción en proceso'));
      }
      yield put(budaActions.syncBudaRejected(null));
      action.callback();
    } else {
      yield put(budaActions.syncBudaRejected(response.message));
    }
  } catch (err) {
    yield put(
      budaActions.syncBudaRejected(
        'Hubo un error al crear la solicitud de depósito'
      )
    );
  }
  yield put(budaActions.finish());
}

export default function* budaSaga() {
  yield takeLatest(BUDA_AUTH_REQUEST, syncBudaRequest);
  yield takeLatest(BUDA_GET_BALANCE, getBudaBalance);
  yield takeLatest(BUDA_QUOTATION, getBudaQuotation);
  yield takeLatest(BUDA_PAYMENT, postBudaPayment);
  yield takeLatest(BITSPLIT_WITHDRAWAL, postWithdrawal);
  yield takeLatest(BITSPLIT_DEPOSIT, postDeposit);
}
