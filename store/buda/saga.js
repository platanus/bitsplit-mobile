import { call, put, takeLatest } from 'redux-saga/effects';
import { actions as budaActions } from './slice';
import { BUDA_AUTH_REQUEST } from '../types';
import api from '../../utils/api';

function *confirmKeysRequest(action) {
  try {
    yield put(budaActions.confirmKeys());
    const all = yield call(api.checkUserKeys, action.payload);
    console.log('BUDA API RESULT', all);
    yield put(api.confirmSuccess(action.payload.apiKey));
  } catch (err) {
    yield put(budaActions.confirmRejected(err.toString()));
  }
}

export default function *loginSaga() {
  yield takeLatest(BUDA_AUTH_REQUEST, confirmKeysRequest);
}
