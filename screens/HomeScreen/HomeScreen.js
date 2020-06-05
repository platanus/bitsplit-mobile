import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, ThemeProvider } from 'react-native-elements';
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
          <Text style={styles.nameText}>Astronaut Monkey</Text>
          <Text style={styles.emailText}>{`${email}`}</Text>
          <Text style={styles.walletText}>Wallet BitSplit</Text>
          <Button
            title='Editar'
            type='outline'
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
          />

          {apiKey ? (
            <View style={styles.wallet}>
              <Text style={styles.saldoText}>
                Saldo: ${balance.BTC.amount} BTC
              </Text>
            </View>
          ) : (
            <View style={styles.wallet}>
              <Text style={styles.saldoText}>
                {loading ? 'Cargando...' : 'Debes sincronizar con Buda'}
              </Text>
            </View>
          )}

          {apiKey ? (
            <View style={styles.appWallet}>
              <Avatar
                containerStyle={styles.walletAvatar}
                source={require('../../assets/Images/buda.png')}
              />
              <Text style={styles.titleText}>Balance</Text>
              <Text style={styles.coinText}>BTC</Text>
              <Text style={styles.moneyText}>${balance.BTC.amount}</Text>
              <Text style={styles.coinText}>CLP</Text>
              <Text style={styles.moneyText}>${balance.CLP.amount}</Text>
            </View>
          ) : (
            <View>
              <View style={styles.syncBudaLeft}>
                <Text style={styles.syncText}>{loading || 'Sync Buda'}</Text>
                <Text style={styles.syncTextBody}>
                  Envia y recibe Bitcoins!
                </Text>
              </View>
              <TouchableOpacity
                style={styles.syncBuda}
                onPress={() => props.navigation.navigate('Buda')}
              >
                <Avatar
                  containerStyle={styles.syncAvatar}
                  source={require('../../assets/Images/buda.png')}
                />
              </TouchableOpacity>
            </View>
          )}

          {/* Cambiar por apiKey de splitwise cuando este implementado */}

          {apiKey ? (
            <View style={styles.appWallet}>
              <Avatar
                containerStyle={styles.walletAvatar}
                source={require('../../assets/Images/split.jpg')}
              />
              <Text style={styles.titleText}>Balance</Text>
              <Text style={styles.coinText}>BTC</Text>
              <Text style={styles.moneyText}>${balance.BTC.amount}</Text>
              <Text style={styles.coinText}>CLP</Text>
              <Text style={styles.moneyText}>${balance.CLP.amount}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.syncText}>{loading || 'Sync SplitWise'}</Text>
              <Text style={styles.syncTextBody}>
                Paga tus deudas de forma fácil y rápida!
              </Text>

              <TouchableOpacity style={styles.syncBuda}>
                <Avatar
                  containerStyle={styles.syncAvatar}
                  source={require('../../assets/Images/split.jpg')}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ThemeProvider>
    </>
  );
}

export default HomeScreen;
