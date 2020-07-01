import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { Button, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../styles/colors';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import BudaAuthScreen from '../screens/BudaAuthScreen/BudaAuthScreen';
import UpdateScreen from '../screens/ProfileScreen/UpdateScreen';
import AuthScreen from '../screens/AuthScreen/AuthScreen';
import PaymentScreen from '../screens/PaymentScreen/PaymentScreen';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen/PaymentHistoryScreen';
import WithdrawalScreen from '../screens/WithdrawalScreen/WithdrawalScreen';
import DepositScreen from '../screens/DepositScreen/DepositScreen';
import SplitwiseDebtsScreen from '../screens/SplitwiseDebtsScreen';
import SplitwiseAuthScreen from '../screens/SplitwiseAuthScreen/SplitwiseAuthScreen';
import PaySplitwiseDebtScreen from '../screens/SplitwiseDebtsScreen/PaySplitwiseDebtScreen';
import NotificationScreen from '../screens/Notifications/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import { LOGOUT_REQUEST } from '../store/types';

const Drawer = createDrawerNavigator();

enableScreens();

const Navigation = () => {
  const token = useSelector(state => state.auth.token);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        drawerContentOptions={{
          activeTintColor: colors.purple,
        }}
      >
        {token ? (
          <>
            <Drawer.Screen name='Inicio' component={HomeScreen} />
            <Drawer.Screen name='Pagar' component={PaymentScreen} />
            <Drawer.Screen
              name='Historial de Pagos'
              component={PaymentHistoryScreen}
            />
            <Drawer.Screen name='Retirar' component={WithdrawalScreen} />
            <Drawer.Screen name='Depositar' component={DepositScreen} />
            <Drawer.Screen name='Splitwise' component={SplitwiseNavigation} />
            <Drawer.Screen
              name='Notificaciones'
              component={NotificationScreen}
            />
            <Drawer.Screen name='Perfil' component={ProfileNavigation} />
          </>
        ) : (
          <Drawer.Screen name='Authentication' component={AuthScreen} />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const ProfileStack = createNativeStackNavigator();

const ProfileNavigation = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      options={{ headerShown: false }}
      name='Settings'
      component={ProfileScreen}
    />
    <ProfileStack.Screen name='Buda' component={BudaAuthScreen} />
    <ProfileStack.Screen
      options={{ headerShown: false }}
      name='Editar'
      component={UpdateScreen}
    />
    <ProfileStack.Screen name='SplitwiseAuth' component={SplitwiseAuthScreen} />
  </ProfileStack.Navigator>
);

const SplitwiseStack = createNativeStackNavigator();

const SplitwiseNavigation = () => (
  <SplitwiseStack.Navigator>
    <SplitwiseStack.Screen
      options={{ headerShown: false }}
      name='SplitwiseDebts'
      component={SplitwiseDebtsScreen}
    />
    <SplitwiseStack.Screen
      options={{ headerShown: false }}
      name='PaySplitwiseDebt'
      component={PaySplitwiseDebtScreen}
    />
  </SplitwiseStack.Navigator>
);

const CustomDrawerContent = props => (
  <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
    <Logout />
  </DrawerContentScrollView>
);

const Logout = () => {
  const dispatch = useDispatch();
  const onPress = () => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  };
  const { loading, token } = useSelector(state => state.auth);
  if (!token) return null;

  return loading ? (
    <ActivityIndicator size='small' color={colors.red} />
  ) : (
    <Button title='Cerrar sesión' color={colors.red} onPress={onPress} />
  );
};

export default Navigation;
