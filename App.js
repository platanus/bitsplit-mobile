import React from 'react';
import { Provider } from 'react-redux';
import MenuNavigator from './navigation/MenuNavigator';
import { store, runSagas } from './store';

runSagas();

export default function App() {
  return (
    <Provider store={store}>
      <MenuNavigator/>
    </Provider>
  );
}

