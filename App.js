import React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
import { store, runSagas } from './store';
import { Provider } from 'react-redux';

import MenuNavigator from './navigation/MenuNavigator';


// Run the saga
runSagas();

export default function App() {
  return <MenuNavigator/>;
  
}




