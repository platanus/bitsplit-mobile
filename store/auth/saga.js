import { call, put, takeLatest } from 'redux-saga/effects';
import { actions as authActions } from './slice';
import { LOGIN_REQUEST, REGISTER_REQUEST } from '../types';
import api from '../../utils/api';

function *loginRequest(action) {
  try {
    yield put(authActions.login());
    console.log('login');
    const { data: { data: { attributes } } } = yield call(api.loginApi, action.payload);
    console.log(attributes);
    if (attributes) {
      yield put(authActions.loginSucces(attributes));
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
    console.log('register', action.payload);
    const { data: { data: { attributes } } } = yield call(api.signUpApi, action.payload);
    console.log(attributes);
    if (attributes) {
      yield put(authActions.loginSucces(attributes));
    } else {
      yield put(authActions.loginRejected('Error registrando'));
    }
  } catch (err) {
    yield put(authActions.loginRejected(err.toString()));
  }
}

export default function *loginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginRequest);
  yield takeLatest(REGISTER_REQUEST, register);
}
