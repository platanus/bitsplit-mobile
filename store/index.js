import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});
function runSagas() {
  sagaMiddleware.run(rootSaga);
}
export { store, runSagas };

