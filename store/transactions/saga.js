import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actions as transactionsActions } from './slice';
import { actions as budaActions } from '../buda/slice';
import { actions as bitsplitWalletActions } from '../bitsplitWallet/slice';
import { GET_WALLETS_BALANCES, GET_TRANSACTIONS_HISTORY } from '../types';

import api from '../../utils/api';

export function* getBalance() {
  yield put(transactionsActions.start());
  try {
    const {
      data: {
        data: {
          error,
          balance,
          balance: { buda: budaBalance, bitsplit: bitsplitBalance },
        },
      },
    } = yield call(api.getBalances);

    if (error) yield put(transactionsActions.setError(error.message));
    else {
      yield put(budaActions.budaBalance(budaBalance));
      yield put(bitsplitWalletActions.setBalance(bitsplitBalance));
    }
  } catch (err) {
    yield put(transactionsActions.setError('Error en el balance'));
    console.error(err);
  }
  yield put(transactionsActions.finish());
}

function* getTransactionHistory() {
  yield put(transactionsActions.start());
  try {
    const {
      user: { email },
    } = yield select(state => state.auth);
    const {
      data: { data },
    } = yield call(api.transactionsHistory);
    const payments = data.transactions
      .map(({ id, attributes }) => ({
        id,
        ...attributes,
        received: attributes.receiver.email === email,
      }))

      .sort(({ created_at: d1 }, { created_at: d2 }) => (d1 < d2 ? 1 : -1));
    yield put(transactionsActions.setPayments(payments));
  } catch (err) {
    console.error(err);
    yield put(transactionsActions.setError('Error en el historial'));
  }
  yield put(transactionsActions.finish());
}

export default function* budaSaga() {
  yield takeLatest(GET_WALLETS_BALANCES, getBalance);
  yield takeLatest(GET_TRANSACTIONS_HISTORY, getTransactionHistory);
}
