import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';

import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import BudaAuthScreen from '../screens/BudaAuthScreen/BudaAuthScreen';


const LoginNavigator = createStackNavigator({
  Login: LoginScreen,
});

const MenuNavigator = createStackNavigator({
  BitSplit: WelcomeScreen,
  Login: LoginNavigator,
  Home: HomeScreen,
  BudaAuth: BudaAuthScreen,
});

export default createAppContainer(MenuNavigator);
