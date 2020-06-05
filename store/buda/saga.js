/* eslint-disable max-statements */
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actions as budaActions } from './slice';
import {
  BUDA_AUTH_REQUEST,
  BUDA_GET_BALANCE,
  BUDA_QUOTATION,
  BUDA_PAYMENT,
  BUDA_GET_PAYMENT_HISTORY,
  BITSPLIT_WITHDRAWAL,
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
      yield put(budaActions.budaBalance(balance));
      yield put(budaActions.setBudaKey(api_key));
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
      data: { error, payment },
    } = yield call(api.budaPaymentApi, { ...action.payload });
    if (payment) {
      yield put(
        budaActions.setLastPayment({
          receiver_email: action.payload.receptor,
          amount: action.payload.amountBtc,
        })
      );
      action.callback();
    } else if (error) {
      yield put(budaActions.syncBudaRejected(error));
    }
  } catch (err) {
    yield put(budaActions.syncBudaRejected('Hubo un error en el pago'));
  }
  yield put(budaActions.finish());
}

function* getBudaPaymentHistory() {
  yield put(budaActions.start());
  try {
    const {
      user: { email },
    } = yield select(state => state.auth);
    const {
      data: { data },
    } = yield call(api.budaPaymentHistoryApi);
    const payments = data
      .map(({ id, attributes }) => ({
        id,
        ...attributes,
        received: attributes.receiver_email === email,
      }))
      .sort(({ created_at: d1 }, { created_at: d2 }) => (d1 < d2 ? 1 : -1));
    yield put(budaActions.setPayments(payments));
  } catch (err) {
    yield put(budaActions.syncBudaRejected(err));
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
      yield put(budaActions.syncBudaRejected('Transacción en proceso'));
      action.callback();
    } else {
      yield put(budaActions.syncBudaRejected(response.message));
    }
  } catch (err) {
    console.log(err);
    yield put(budaActions.syncBudaRejected('Hubo un error en el retiro'));
  }
  yield put(budaActions.finish());
}

export default function* budaSaga() {
  yield takeLatest(BUDA_AUTH_REQUEST, syncBudaRequest);
  yield takeLatest(BUDA_GET_BALANCE, getBudaBalance);
  yield takeLatest(BUDA_QUOTATION, getBudaQuotation);
  yield takeLatest(BUDA_PAYMENT, postBudaPayment);
  yield takeLatest(BUDA_GET_PAYMENT_HISTORY, getBudaPaymentHistory);
  yield takeLatest(BITSPLIT_WITHDRAWAL, postWithdrawal);
}
