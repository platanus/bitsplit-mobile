import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, ThemeProvider } from 'react-native-elements';
import { BUDA_GET_BALANCE, START_SETUP } from '../../store/types';
import styles from './styles';
import Header from '../../components/Header';
import Theme from '../../styles/Theme';
import PinOverlay from '../../components/PinOverlay/PinOverlay';
import authedAxios from '../../utils/api/authedAxios';

function HomeScreen(props) {
  const dispatch = useDispatch();
  const {
    auth: {
      user: { email },
      token,
    },
    buda: { apiKey, balance, loading },
    onstart: { startFlag },
  } = useSelector(state => state);

  useEffect(() => {
    if (apiKey) {
      dispatch({ type: BUDA_GET_BALANCE });
    }
  }, [apiKey, dispatch]);

  useEffect(() => authedAxios.createInstance({ email, token }), []);

  const startSetup = () => dispatch({ type: START_SETUP });

  return (
    <>
      <Header title='Inicio' />
      {startFlag && (
        <PinOverlay onSuccess={startSetup} pinLength={4} maxTries={3} />
      )}
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

          {balance ? (
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

          {balance ? (
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

          {/* Cambiar por balance de splitwise cuando este implementado */}

          {balance ? (
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
