import React from 'react';
import { StyleSheet, View } from 'react-native';
import { store, runSagas } from './store';
import { Provider } from 'react-redux';
import { LoginScreen } from './screens/LoginScreen/LoginScreen';

// Run the saga
runSagas();

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <LoginScreen/>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
