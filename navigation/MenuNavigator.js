import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import BudaAuthScreen from '../screens/BudaAuthScreen/BudaAuthScreen';
import AuthScreen from '../screens/AuthScreen/AuthScreen';
import PaymentScreen from '../screens/PaymentScreen/PaymentScreen';
import { Platform } from 'react-native';
import colors from '../styles/colors';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.purple : '',
  },
  // headerTitleStyle: {
  //   fontFamily: 'open-sans-bold',
  // },
  // headerBackTitlesStyle: {
  //   fontFamily: 'open-sans',
  // },
  headerTintColor: Platform.OS === 'android' ? 'white' : colors.purple,
};

const AuthNavigator = createStackNavigator({
  Authentication: AuthScreen,
}, {
  defaultNavigationOptions: defaultNavOptions,
});

const HomeNavigator = createStackNavigator({
  Home: HomeScreen,
  BudaAuth: BudaAuthScreen,
  Payment: PaymentScreen,
}, {
  defaultNavigationOptions: defaultNavOptions,
});

const PaymentNavigator = createStackNavigator({
  Payment: PaymentScreen,
}, {
  defaultNavigationOptions: defaultNavOptions,
});

const ProfileNavigator = createDrawerNavigator({
  Home: HomeNavigator,
  Payment: PaymentNavigator,
}, {
  contentOptions: {
    activeTintColor: colors.purple,
  },
});

const MenuNavigator = createSwitchNavigator({
  Authentication: AuthNavigator,
  Home: ProfileNavigator,
}, {
  defaultNavigationOptions: defaultNavOptions,
});

export default createAppContainer(MenuNavigator);
