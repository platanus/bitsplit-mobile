import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';

import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AuthScreen from '../screens/Authenti/AuthScreen';

const AuthNavigator = createStackNavigator({
  Autentificacion: AuthScreen,
});

const MenuNavigator = createSwitchNavigator({
  BitSplit: WelcomeScreen,
  Autentificacion: AuthNavigator,
  Home: HomeScreen,

});

export default createAppContainer(MenuNavigator);
