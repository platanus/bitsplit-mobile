import { createAppContainer } from 'react-navigation';
import { createStackNavigator, createSwitchNavigator} from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';

import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';

const LoginNavigator = createStackNavigator({
    Login:  LoginScreen
});

const MenuNavigator = createStackNavigator({
    BitSplit: WelcomeScreen,
    Login:   LoginNavigator
});

export default createAppContainer(MenuNavigator);