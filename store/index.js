import { configureStore } from '@reduxjs/toolkit';

import { AsyncStorage } from 'react-native';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['onstart'],
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
