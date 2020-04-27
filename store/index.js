import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-community/async-storage';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducers';
import rootSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
// mount it on the Store
const persistConfig = {
  key: 'root',
  AsyncStorage,
  whitelist: ['auth', 'buda'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});
function runSagas() {
  sagaMiddleware.run(rootSaga);
}
const persistor = persistStore(store, { storage: AsyncStorage });
export { store, runSagas, persistor };

