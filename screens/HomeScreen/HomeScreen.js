import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, Badge, ThemeProvider } from 'react-native-elements';
import { BUDA_GET_BALANCE } from '../../store/types';
import styles from './styles';
import Header from '../../components/Header';
import Theme from '../../styles/Theme';

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
    <>
      <Header title='Inicio' />
      <ThemeProvider theme={Theme}>
        <View style={styles.screen}>
          <Avatar
            size='large'
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
                onPress={() => props.navigation.navigate('Pagar')}
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
                onPress={() => props.navigation.navigate('Buda')}
              />
            </View>
          )}
        </View>
      </ThemeProvider>
    </>
  );
}

export default HomeScreen;
