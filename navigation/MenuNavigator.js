import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import AuthScreen from '../screens/AuthScreen/AuthScreen';

const AuthNavigator = createStackNavigator({
  Authentication: AuthScreen,
});

const MenuNavigator = createSwitchNavigator({
  BitSplit: WelcomeScreen,
  Authentication: AuthNavigator,
  Home: HomeScreen,

});

export default createAppContainer(MenuNavigator);
