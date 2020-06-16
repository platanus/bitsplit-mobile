import { spawn, all, call } from 'redux-saga/effects';
import authSaga from './auth/saga';
import budaSaga from './buda/saga';
import firebaseSaga from './firebase/saga';
import splitwiseSaga from './splitwise/saga';
import transactionsSaga from './transactions/saga';

export default function* rootSaga() {
  const sagas = [
    authSaga,
    budaSaga,
    firebaseSaga,
    splitwiseSaga,
    transactionsSaga,
  ];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error(e);
          }
        }
      })
    )
  );
}
