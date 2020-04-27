import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actions as budaActions } from './slice';
import { BUDA_AUTH_REQUEST, BUDA_GET_BALANCE } from '../types';
import api from '../../utils/api';

function *syncBudaRequest(action) {
  try {
    yield put(budaActions.syncBuda());
    const { token, user: { email } } = yield select(state => state.auth);
    // eslint-disable-next-line camelcase
    const { data: { data: { attributes: { api_key } } } } = yield call(api.budaSyncApi, { ...action.payload, token, email });
    const { data: { data: { error, balance } } } = yield call(api.budaBalance, { token, email });
    if (error) {
      yield put(budaActions.syncBudaRejected(error.message));
    } else {
      yield put(budaActions.budaBalance(balance));
      yield put(budaActions.setBudaKey(api_key));
    }
  } catch (err) {
    yield put(budaActions.syncBudaRejected('tus credenciales son invalidas'));
  }
}

export function *getBudaBalance() {
  try {
    yield put(budaActions.syncBuda());
    const { token, user: { email } } = yield select(state => state.auth);
    const { data: { data: { error, balance } } } = yield call(api.budaBalance, { token, email });
    if (error) {
      yield put(budaActions.setBudaKey(null));
      yield put(budaActions.syncBudaRejected(error.message));
    } else {
      yield put(budaActions.budaBalance(balance));
    }
  } catch (err) {
    yield put(budaActions.syncBudaRejected('tus credenciales son invalidas'));
  }
}

export default function *loginSaga() {
  yield takeLatest(BUDA_AUTH_REQUEST, syncBudaRequest);
  yield takeLatest(BUDA_GET_BALANCE, getBudaBalance);
}
