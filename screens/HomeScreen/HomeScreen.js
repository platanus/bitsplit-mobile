import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, Badge } from 'react-native-elements';
import { BUDA_GET_BALANCE } from '../../store/types';
import styles from './styles';

function HomeScreen(props) {
  const dispatch = useDispatch();
  const {
    auth: {
      user: { email },
    },
    buda: { apiKey, balance, loading },
  } = useSelector(state => state);

  useEffect(() => {
    if (apiKey) {
      dispatch({ type: BUDA_GET_BALANCE });
    }
  }, [apiKey, dispatch]);

  return (
    <View style={styles.screen}>
      <Avatar
        size='large'
        rounded
        source={{
          uri:
            'https://www.nicepng.com/png/detail/804-8049853_med-boukrima-specialist-webmaster-php-e-commerce-web.png',
        }}
      />
      <Badge
        value={apiKey ? 'Sincronizado con Buda' : 'Falta Sincronizar'}
        status={apiKey ? 'success' : 'error'}
      />
      <Text>{`Hola ${email}!`}</Text>

      {balance ? (
        <View>
          <Text
            style={styles.saldoText}
          >{`Saldo \n${balance.BTC.amount} BTC\n${balance.CLP.amount} CLP `}</Text>
          <Button
            title='Generar Pago'
            type='solid'
            onPress={() => props.navigation.navigate({ routeName: 'Pagar' })}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.saldoText}>
            {loading || 'Debes sincronizar con Buda'}
          </Text>
          <Button
            title='Sincronizar'
            type='solid'
            onPress={() => props.navigation.navigate({ routeName: 'BudaAuth' })}
          />
        </View>
      )}
    </View>
  );
}

HomeScreen.navigationOptions = navData => ({
  headerTitle: 'Inicio',
  headerLeft: () => (
    <Button
      onPress={() => {
        navData.navigation.toggleDrawer();
      }}
    />
  ),
});

export default HomeScreen;
