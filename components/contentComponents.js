import React from 'react';
import { SafeAreaView, Button, View, ActivityIndicator } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { DrawerItems } from 'react-navigation-drawer';
import { LOGOUT_REQUEST } from '../store/types';
import colors from '../styles/colors';

function contentComponents(props) {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  return (
    <View style = {{ flex: 1, paddingTop: 20 }}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerItems {... props} />
        {
          loading ?
            <ActivityIndicator size='small' color={colors.red}/> :
            <Button
              title="Cerrar sesión"
              color={colors.red}
              onPress={() => {
              // dispach logout
                dispatch({ type: LOGOUT_REQUEST, callback: () => props.navigation.navigate({ routeName: 'Authentication' }) });
              }}
            />
        }
      </SafeAreaView>
    </View>
  );
}

export default contentComponents;
