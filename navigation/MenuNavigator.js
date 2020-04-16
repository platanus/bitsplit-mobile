import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';

const MenuNavigator = createStackNavigator({
    Welcome: WelcomeScreen,
    Login:  LoginScreen
});

export default createAppContainer(MenuNavigator);