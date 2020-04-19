import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';

import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const LoginNavigator = createStackNavigator({
  Login: LoginScreen,
});

const MenuNavigator = createStackNavigator({
  BitSplit: WelcomeScreen,
  Login: LoginNavigator,
  Home: HomeScreen,
});

export default createAppContainer(MenuNavigator);
