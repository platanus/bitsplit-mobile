/* eslint-disable max-statements */
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions as splitwiseActions } from './slice';
import { SPLITWISE_GET_DEBTS } from '../types';
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

export default function* splitwiseSaga() {
  yield takeLatest(SPLITWISE_GET_DEBTS, getSplitwiseDebts);
}
