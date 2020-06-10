import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { Button, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../styles/colors';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import BudaAuthScreen from '../screens/BudaAuthScreen/BudaAuthScreen';
import AuthScreen from '../screens/AuthScreen/AuthScreen';
import PaymentScreen from '../screens/PaymentScreen/PaymentScreen';
import PaymentHistoryScreen from '../screens/PaymentHistoryScreen/PaymentHistoryScreen';
import WithdrawalScreen from '../screens/WithdrawalScreen/WithdrawalScreen';
import DepositScreen from '../screens/DepositScreen/DepositScreen';
import SplitwiseDebtsScreen from '../screens/SplitwiseDebtsScreen';
import NotificationScreen from '../screens/Notifications/NotificationScreen';
import { LOGOUT_REQUEST } from '../store/types';

const Drawer = createDrawerNavigator();

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
            <Drawer.Screen name='Buda' component={BudaAuthScreen} />
            <Drawer.Screen name='Pagar' component={PaymentScreen} />
            <Drawer.Screen
              name='Historial de Pagos'
              component={PaymentHistoryScreen}
            />
            <Drawer.Screen name='Retirar' component={WithdrawalScreen} />
            <Drawer.Screen name='Depositar' component={DepositScreen} />
            <Drawer.Screen name='Splitwise' component={SplitwiseDebtsScreen} />
            <Drawer.Screen
              name='Notificaciones'
              component={NotificationScreen}
            />
          </>
        ) : (
          <Drawer.Screen name='Authentication' component={AuthScreen} />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const CustomDrawerContent = props => (
  <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
    <Logout />
  </DrawerContentScrollView>
);

const Logout = props => {
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
