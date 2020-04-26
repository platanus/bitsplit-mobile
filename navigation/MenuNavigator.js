import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import BudaAuthScreen from '../screens/BudaAuthScreen/BudaAuthScreen';
import AuthScreen from '../screens/AuthScreen/AuthScreen';
import PaymentScreen from '../screens/PaymentScreen/PaymentScreen';
import StartupScreen from '../screens/AuthScreen/StartupScreen';

const AuthNavigator = createStackNavigator({
  Authentication: AuthScreen,
});

const HomeNavigator = createStackNavigator({
  Home: HomeScreen,
  BudaAuth: BudaAuthScreen,
  Payment: PaymentScreen,
});

const MenuNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Authentication: AuthNavigator,
  Home: HomeNavigator,
});

export default createAppContainer(MenuNavigator);
