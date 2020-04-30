import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Platform } from 'react-native';
import colors from '../styles/colors';
import contentComponents from '../components/contentComponents';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import BudaAuthScreen from '../screens/BudaAuthScreen/BudaAuthScreen';
import AuthScreen from '../screens/AuthScreen/AuthScreen';
import PaymentScreen from '../screens/PaymentScreen/PaymentScreen';
import RecordScreen from '../screens/HomeScreen/RecordScreen';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.purple : '',
  },
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

const ProfileNavigator = createDrawerNavigator(
  {
    Home: HomeNavigator,
    BudaAuth: BudaAuthScreen,
    Payment: PaymentScreen,
    Record: RecordScreen,
  },
  {
    contentOptions: {
      activeTintColor: colors.purple,
    },
    contentComponent: contentComponents,

  },

);

const MenuNavigator = createSwitchNavigator({
  Authentication: AuthNavigator,
  Home: ProfileNavigator,
}, {
  defaultNavigationOptions: defaultNavOptions,
});

export default createAppContainer(MenuNavigator);
