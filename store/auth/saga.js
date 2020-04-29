/* eslint-disable max-statements */
/* eslint-disable camelcase */
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actions as authActions } from './slice';
import { actions as budaActions } from '../buda/slice';
import { getBudaBalance } from '../buda/saga';
import { LOGIN_REQUEST, REGISTER_REQUEST, LOGOUT_REQUEST } from '../types';
import api from '../../utils/api';

function *loginRequest(action) {
  yield put(budaActions.start());
  try {
    const { data: { data: { attributes, attributes: { api_key } } } } = yield call(api.loginApi, action.payload);
    if (attributes) {
      yield put(authActions.loginSuccess(attributes));
      if (api_key) {
        yield *getBudaBalance();
        yield put(budaActions.setBudaKey(api_key));
      }
    } else {
      yield put(authActions.loginRejected('Usuario y contraseña no coinciden'));
    }
  } catch (err) {
    if (err.response.status.toString() === '500') {
      yield put(authActions.loginRejected('Estamos experimentando problemas internos'));
    } else {
      yield put(authActions.loginRejected('Tus credenciales son invalidas'));
    }
  }
  yield put(budaActions.finish());
}

function *register(action) {
  yield put(budaActions.start());
  try {
    const { data: { data: { attributes } } } = yield call(api.signUpApi, action.payload);
    if (attributes) {
      yield put(authActions.loginSuccess(attributes));
    } else {
      yield put(authActions.loginRejected('Error registrando'));
    }
  } catch (err) {
    if (err.response.status.toString() === '500') {
      yield put(authActions.loginRejected('Estamos experimentando problemas internos'));
    } else {
      yield put(authActions.loginRejected('Error registrando, revisa tus credenciales'));
    }
  }
  yield put(budaActions.finish());
}

function *logoutRequest(action) {
  const success_status = 204;
  yield put(budaActions.start());
  try {
    const { token, user: { email } } = yield select(state => state.auth);
    const { status } = yield call(api.logoutApi, { email, token });
    if (status === success_status) {
      yield put(authActions.logout());
      yield put(budaActions.logout());
      action.callback();
    }
  } catch (err) {
    console.log('err', err);
  }

  yield put(budaActions.finish());
}

export default function *loginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginRequest);
  yield takeLatest(REGISTER_REQUEST, register);
  yield takeLatest(LOGOUT_REQUEST, logoutRequest);
}
