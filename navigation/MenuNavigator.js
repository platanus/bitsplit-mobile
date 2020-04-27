import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import BudaAuthScreen from '../screens/BudaAuthScreen/BudaAuthScreen';
import AuthScreen from '../screens/AuthScreen/AuthScreen';

const AuthNavigator = createStackNavigator({
  Authentication: AuthScreen,
});

const HomeNavigator = createStackNavigator({
  Home: HomeScreen,
  BudaAuth: BudaAuthScreen,
});

const MenuNavigator = createSwitchNavigator({
  Authentication: AuthNavigator,
  Home: HomeNavigator,
});

export default createAppContainer(MenuNavigator);
