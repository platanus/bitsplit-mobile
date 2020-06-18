import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import moment from 'moment';
import 'moment/locale/es';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';
import Navigation from './components/Navigation';
import { store, runSagas, persistor } from './store';

moment.locale('es');

runSagas();

export default function App() {
  const [fontsLoaded] = useFonts({
    SpaceMonoBoldItalic: require('./assets/fonts/SpaceMono-BoldItalic.ttf'),
    SpaceMonoRegular: require('./assets/fonts/SpaceMono-Regular.ttf'),
    SpaceMonoBold: require('./assets/fonts/SpaceMono-Bold.ttf'),
    SpaceMonoItalic: require('./assets/fonts/SpaceMono-Italic.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
}
