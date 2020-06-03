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
            containerStyle={styles.avatar}
            source={require('../../assets/Images/spacemonkey.png')}
          />
          {/* <Badge
            value={apiKey ? 'Sincronizado con Buda' : 'Falta Sincronizar'}
            status={apiKey ? 'success' : 'error'}
          /> */}
          <Text style={styles.nameText}>Astronaut Monkey</Text>
          <Text style={styles.emailText}>{`${email}`}</Text>
          <Text style={styles.walletText}>Wallet BitSplit</Text>
          <Button title='Editar' type='outline' buttonStyle={styles.button} />

          {balance ? (
            <View style={styles.wallet}>
              <Text style={styles.saldoText}>
                Saldo: ${balance.BTC.amount} BTC
              </Text>
            </View>
          ) : (
            <View style={styles.wallet}>
              <Text style={styles.saldoText}>
                {loading || 'Debes sincronizar con Buda'}
              </Text>
            </View>
          )}

          {balance ? (
            <View style={styles.budaWallet}>
              <Text style={styles.saldoText}>Sync Buda</Text>
            </View>
          ) : (
            <View style={styles.syncBuda}>
              <Text style={styles.saldoText}>
                {loading || 'Debes sincronizar con Buda'}
              </Text>
            </View>
          )}
        </View>
      </ThemeProvider>
    </>
  );
}

export default HomeScreen;
