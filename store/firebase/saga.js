/* eslint-disable max-statements */
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actions as firebaseActions } from './slice';
import { FIREBASE_NOTIFICATIONS } from '../types';
import api from '../../utils/api';

function *patchNotifications(action) {
  yield put(firebaseActions.start());
  try {
    const { token, user: { email } } = yield select(state => state.auth);
    const { response } = yield call(api.firebaseNotification, { token, email, notification_token: action.payload });
  } catch (err) {
    yield put(firebaseActions.firebaseRejected(err));
  }
  yield put(firebaseActions.finish());
}

export default function *firebaseSaga() {
  yield takeLatest(FIREBASE_NOTIFICATIONS, patchNotifications);
}
