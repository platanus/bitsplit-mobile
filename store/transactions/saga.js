import { call, put, takeLatest } from 'redux-saga/effects';
import { actions as transactionsActions } from './slice';
import { actions as budaActions } from '../buda/slice';
import { actions as bitsplitWalletActions } from '../bitsplitWallet/slice';
import { GET_WALLETS_BALANCES } from '../types';

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
      console.log(balance);
      yield put(budaActions.budaBalance(budaBalance));
      yield put(bitsplitWalletActions.setBalance(bitsplitBalance));
    }
  } catch (err) {
    yield put(transactionsActions.setError('Error en el balance'));
    console.error(err);
  }
  yield put(transactionsActions.finish());
}

export default function* budaSaga() {
  yield takeLatest(GET_WALLETS_BALANCES, getBalance);
}
