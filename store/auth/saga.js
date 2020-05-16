/* eslint-disable max-statements */
/* eslint-disable camelcase */
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actions as authActions } from './slice';
import { actions as budaActions } from '../buda/slice';
import { LOGIN_REQUEST, REGISTER_REQUEST, LOGOUT_REQUEST } from '../types';
import api from '../../utils/api';

function *fetchUser() {
  yield put(authActions.start());
  try {
    const { token, user: { email } } = yield select(state => state.auth);
    const { data: { data: { attributes, attributes: { api_key } } } } = yield call(api.fetchUserApi, { email, token });
    console.log('fetch user', attributes);

    if (attributes) {
      if (api_key) yield put(budaActions.setBudaKey(api_key));
      yield put(authActions.loginSuccess(attributes));
    }
  } catch (err) {
    console.log(err);
  }
  yield put(authActions.finish());
}

function *loginRequest(action) {
  yield put(authActions.start());
  try {
    const { data: { data: { authentication_token } } } = yield call(api.loginApi, action.payload);
    console.log('login res', authentication_token);
    yield put(authActions.loginSuccess({ authentication_token }));
    yield call(fetchUser);
  } catch (err) {
    console.log(err);
    if (err.response.status.toString() === '500') {
      yield put(authActions.loginRejected('Estamos experimentando problemas internos'));
    } else {
      yield put(authActions.loginRejected('Tus credenciales son invalidas'));
    }
  }
  yield put(authActions.finish());
}

function *register(action) {
  yield put(authActions.start());
  try {
    console.log('post start');
    const { data: { data: { attributes } } } = yield call(api.signUpApi, action.payload);
    console.log('post', attributes);
    yield put(authActions.fetchUser(attributes));
    const { data: { data: { authentication_token } } } = yield call(api.loginApi, action.payload);
    console.log('registrar', authentication_token);
    if (attributes && authentication_token) {
      yield put(authActions.loginSuccess({ authentication_token }));
    } else {
      yield put(authActions.loginRejected('Error registrando'));
    }
  } catch (err) {
    console.log(err);
    if (err.response.status.toString() === '500') {
      yield put(authActions.loginRejected('Estamos experimentando problemas internos'));
    } else {
      yield put(authActions.loginRejected('Error registrando, revisa tus credenciales'));
    }
  }
  yield put(authActions.finish());
}

function *logoutRequest(action) {
  const success_status = 204;
  yield put(budaActions.start());
  try {
    const { token, user: { email } } = yield select(state => state.auth);
    const { status } = yield call(api.logoutApi, { email, token });
    if (status === success_status) {
      yield put(authActions.logout());
      action.callback();
      yield put(authActions.reset());
      yield put(budaActions.reset());
    }
  } catch (err) {
  }
  yield put(budaActions.finish());
}

export default function *loginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginRequest);
  yield takeLatest(REGISTER_REQUEST, register);
  yield takeLatest(LOGOUT_REQUEST, logoutRequest);
}
