import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actions as budaActions } from './slice';
import { BUDA_AUTH_REQUEST } from '../types';
import api from '../../utils/api';

function *syncBudaRequest(action) {
  try {
    yield put(budaActions.syncBuda());
    const { token, user: { email } } = yield select(state => state.auth);
    const { data: { data: { attributes } } } = yield call(api.budaSyncApi, { ...action.payload, token, email });
    yield put(budaActions.syncBudaSuccess(attributes));
  } catch (err) {
    yield put(budaActions.syncBudaRejected(err.toString()));
  }
}

export default function *loginSaga() {
  yield takeLatest(BUDA_AUTH_REQUEST, syncBudaRequest);
}
