import {spawn, all, call} from 'redux-saga/effects';
import authSaga from './auth/saga';
export default function* rootSaga(){

  const sagas = [
    authSaga
  ];

  yield all(sagas.map(saga =>
    spawn(function* () {
      while (true) {
        try {
          yield call(saga)
          break
        } catch (e) {
          console.log(e)
        }
      }
    }))
  );
}