import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import BudaAuthScreen from '../screens/BudaAuthScreen/BudaAuthScreen';
import AuthScreen from '../screens/AuthScreen/AuthScreen';

const AuthNavigator = createStackNavigator({
  Autentificacion: AuthScreen,
});

const MenuNavigator = createSwitchNavigator({
  BitSplit: WelcomeScreen,
  Autentificacion: AuthNavigator,
  Home: HomeScreen,
  BudaAuth: BudaAuthScreen,
});

export default createAppContainer(MenuNavigator);
