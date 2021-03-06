/* eslint-disable max-statements */
/* eslint-disable camelcase */
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions as authActions } from './slice';
import { actions as budaActions } from '../buda/slice';
import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOGOUT_REQUEST,
  FETCH_USER,
  SET_PIN,
  UPDATE_USER,
} from '../types';
import api from '../../utils/api';
import authedAxios from '../../utils/api/authedAxios';
import { registerForPushNotifications } from '../../utils/api/notifications';
import encrypt from '../../utils/helpers/encrypt';

function* fetchUser() {
  yield put(authActions.start());
  try {
    const {
      data: {
        data: {
          attributes,
          attributes: { api_key },
        },
      },
    } = yield call(api.fetchUserApi);
    if (api_key) yield put(budaActions.setBudaKey(api_key));
    yield put(authActions.fetchUser(attributes));
  } catch (err) {
    yield put(authActions.loginRejected('Error pidiendo datos del usuario'));
  }
  yield put(authActions.finish());
}

function* loginRequest(action) {
  yield put(authActions.start());
  try {
    const {
      data: { authentication_token },
    } = yield call(api.loginApi, action.payload);
    yield put(
      authActions.loginSuccess({
        email: action.payload.email,
        authentication_token,
      })
    );
    yield* fetchUser();
  } catch (err) {
    if (err.response.status.toString() === '500') {
      yield put(
        authActions.loginRejected('Estamos experimentando problemas internos')
      );
    } else {
      yield put(authActions.loginRejected('Tus credenciales son invalidas'));
    }
  }
  yield call(registerForPushNotifications);
  yield put(authActions.finish());
}

function* register(action) {
  yield put(authActions.start());
  try {
    const {
      data: {
        data: { attributes },
      },
    } = yield call(api.signUpApi, action.payload);
    yield put(authActions.fetchUser(attributes));
    const {
      data: { authentication_token },
    } = yield call(api.loginApi, action.payload);
    if (attributes && authentication_token) {
      yield put(authActions.loginSuccess({ authentication_token }));
    } else {
      yield put(authActions.loginRejected('Error registrando'));
    }
  } catch (err) {
    if (err.response.status.toString() === '500') {
      yield put(
        authActions.loginRejected('Estamos experimentando problemas internos')
      );
    } else {
      yield put(
        authActions.loginRejected('Error registrando, revisa tus credenciales')
      );
    }
  }
  yield call(registerForPushNotifications);
  yield put(authActions.finish());
}

function* logoutRequest() {
  yield put(authActions.start());
  const success_status = [200, 204];
  try {
    const { status } = yield call(api.logoutApi);
    if (success_status.includes(status)) {
      yield put(authActions.logout());
      yield put(authActions.reset());
      yield put(budaActions.reset());
      authedAxios.clear();
    }
  } catch (err) {
    console.error(err);
  }
  yield put(authActions.finish());
}

function* setPin(action) {
  const digest = yield call(encrypt, action.payload);
  yield put(authActions.setPin(digest));
}
function* updateRequest(action) {
  yield put(authActions.start());
  try {
    yield call(api.userUpdateApi, action.payload);
    yield* fetchUser();
  } catch (err) {
    console.error(err);
  }
  yield put(authActions.finish());
}

export default function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, loginRequest);
  yield takeLatest(REGISTER_REQUEST, register);
  yield takeLatest(LOGOUT_REQUEST, logoutRequest);
  yield takeLatest(FETCH_USER, fetchUser);
  yield takeLatest(SET_PIN, setPin);
  yield takeLatest(UPDATE_USER, updateRequest);
}
