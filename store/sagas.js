import { spawn, all, call } from 'redux-saga/effects';
import authSaga from './auth/saga';
import budaSaga from './buda/saga';
import firebaseSaga from './firebase/saga';

export default function *rootSaga() {
  const sagas = [
    authSaga,
    budaSaga,
    firebaseSaga,
  ];

  yield all(sagas.map(saga =>
    spawn(function *() {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.error(e);
        }
      }
    })),
  );
}
