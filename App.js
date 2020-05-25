import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import MenuNavigator from './navigation/MenuNavigator';
import { store, runSagas, persistor } from './store';

moment.locale('es');

runSagas();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MenuNavigator/>
      </PersistGate>
    </Provider>
  );
}

