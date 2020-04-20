/* eslint-disable max-statements */
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actions as budaActions } from './slice';
import { BUDA_AUTH_REQUEST } from '../types';
import api from '../../utils/api';

function *syncBudaRequest(action) {
  try {
    yield put(budaActions.syncBuda());
    const { token, user: { email } } = yield select(state => state.auth);
    // eslint-disable-next-line camelcase
    const { data: { data: { attributes: { api_key } } } } = yield call(api.budaSyncApi, { ...action.payload, token, email });
    const { data: { data: { error, balance } } } = yield call(api.budaBalance, { token, email });
    console.log('BALANCE', balance);
    if (error) {
      yield put(budaActions.syncBudaRejected(error.message));
    } else {
      yield put(budaActions.syncBudaSuccess(api_key));
      yield put(budaActions.budaBalance(balance));
    }

    // put balance
  } catch (err) {
    console.log('ERROR', Object.keys(err), err.response);
    yield put(budaActions.syncBudaRejected(err.toString()));
  }
}

export default function *loginSaga() {
  yield takeLatest(BUDA_AUTH_REQUEST, syncBudaRequest);
}
