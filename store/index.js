import { configureStore } from '@reduxjs/toolkit';

import { AsyncStorage } from 'react-native';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducers';
import rootSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});
function runSagas() {
  sagaMiddleware.run(rootSaga);
}
const persistor = persistStore(store);
export { store, runSagas, persistor };
