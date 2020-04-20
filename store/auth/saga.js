import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actions as authActions } from './slice';
import { LOGIN_REQUEST, REGISTER_REQUEST, BUDA_AUTH_REQUEST } from '../types';
import api from '../../utils/api';

function *loginRequest(action) {
  try {
    yield put(authActions.login());
    const { data: { data: { attributes } } } = yield call(api.loginApi, action.payload);
    console.log('Login\n', attributes);
    if (attributes) {
      yield put(authActions.loginSuccess(attributes));
    } else {
      yield put(authActions.loginRejected('Usuario y contraseña no coinciden'));
    }
  } catch (err) {
    yield put(authActions.loginRejected(err.toString()));
  }
}

function *register(action) {
  try {
    yield put(authActions.login());
    const { data: { data: { attributes } } } = yield call(api.signUpApi, action.payload);
    if (attributes) {
      yield put(authActions.loginSuccess(attributes));
    } else {
      yield put(authActions.loginRejected('Error registrando'));
    }
  } catch (err) {
    yield put(authActions.loginRejected(err.toString()));
  }
}

function *syncBudaRequest(action) {
  try {
    yield put(authActions.syncBuda());
    const { token, user: { email } } = yield select(state => state.auth);
    const { data: { data: { attributes } } } = yield call(api.budaSyncApi, { ...action.payload, token, email });
    yield put(authActions.syncBudaSuccess(attributes));
  } catch (err) {
    yield put(authActions.syncBudaRejected(err.toString()));
  }
}

export default function *loginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginRequest);
  yield takeLatest(REGISTER_REQUEST, register);
  yield takeLatest(BUDA_AUTH_REQUEST, syncBudaRequest);
}
