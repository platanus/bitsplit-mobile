/* eslint-disable max-statements */
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { actions as splitwiseActions } from './slice';
import { SPLITWISE_GET_DEBTS, SPLITWISE_POST_AUTH } from '../types';
import api from '../../utils/api';

function* getSplitwiseDebts() {
  yield put(splitwiseActions.start());
  try {
    const {
      data: {
        data: { attributes },
      },
    } = yield call(api.splitwiseDebts);
    yield put(splitwiseActions.setDebts(attributes));
  } catch (err) {
    yield put(splitwiseActions.setError(err));
  }
  yield put(splitwiseActions.finish());
}

function* postSplitwiseAuth() {
  yield put(splitwiseActions.start());
  try {
    const {
      data: {
        data: {
          attributes: { authorize_url },
        },
      },
    } = yield call(api.splitwiseAuth, {});
    if (authorize_url) {
      yield put(splitwiseActions.setAuthUrl(authorize_url));
    }
  } catch (err) {
    console.log(err);
    yield put(splitwiseActions.setError(err));
  }
  yield put(splitwiseActions.finish());
}

export default function* splitwiseSaga() {
  yield takeLatest(SPLITWISE_GET_DEBTS, getSplitwiseDebts);
  yield takeLatest(SPLITWISE_POST_AUTH, postSplitwiseAuth);
}
