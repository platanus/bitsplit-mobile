import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button, ThemeProvider } from 'react-native-elements';
import {
  GET_WALLETS_BALANCES,
  START_SETUP,
  SPLITWISE_GET_DEBTS,
} from '../../store/types';
import styles from './styles';
import Header from '../../components/Header';
import Theme from '../../styles/Theme';
import Wallet from '../../components/Wallet/Wallet';
import authedAxios from '../../utils/api/authedAxios';

function useStartup() {
  const dispatch = useDispatch();
  const {
    auth: {
      user: { email },
      token,
    },
  } = useSelector(state => state);

  useEffect(() => {
    if (email && token) {
      authedAxios.createInstance({ email, token });
      dispatch({ type: GET_WALLETS_BALANCES });
      dispatch({ type: SPLITWISE_GET_DEBTS });
    }
  }, [email, token]);

  return () => dispatch({ type: START_SETUP });
}

function useProfile() {
  const { user } = useSelector(state => state.auth);
  const isSplitSync = user.picture_url !== null;

  const {
    auth: {
      user: { email },
    },
    buda: { apiKey, loading: budaLoading },
    splitwise: { loading: splitwiseLoading },
  } = useSelector(state => state);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isSplitSync) {
      dispatch({ type: SPLITWISE_GET_DEBTS });
    }
  }, [isSplitSync]);

  const navegation = useNavigation();
  const goBudaSync = () => navegation.navigate('Buda');
  const goEdit = () => navegation.navigate('Editar');
  const goSplitwiseSync = () => navegation.navigate('SplitwiseAuth');

  return {
    email,
    apiKey,
    budaLoading,
    isSplitSync,
    splitwiseLoading,
    user,
    goBudaSync,
    goEdit,
    goSplitwiseSync,
  };
}

function ProfileScreen() {
  const {
    email,
    isSplitSync,
    user,
    goBudaSync,
    goEdit,
    goSplitwiseSync,
  } = useProfile();

  const {
    auth: {
      user: { wallet: defaultWallet },
    },
    buda: { balance: budaBalance, apiKey },
    bitsplitWallet: { balance: bitsplitBalance },
  } = useSelector(state => state);

  return (
    <>
      <Header title='Perfil' />
      <ThemeProvider theme={Theme}>
        <View style={styles.screen}>
          <Avatar
            containerStyle={styles.avatar}
            source={{
              uri: `${
                user.picture_url.large ||
                'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg'
              }`,
            }}
          />
          <Text style={styles.nameText}>{`${
            user.name || 'Armando Casas'
          }`}</Text>
          <Text style={styles.emailText}>{`${email}`}</Text>
          <Text style={styles.walletText}>{`Wallet ${
            user.wallet || 'Define una Wallet'
          }`}</Text>

          {defaultWallet === 'bitsplit' && bitsplitBalance && (
            <Wallet
              name={'Bitsplit'}
              isDefault={defaultWallet === 'bitsplit'}
              balance={bitsplitBalance}
            />
          )}

          {defaultWallet === 'buda' && apiKey && (
            <Wallet name={'Buda'} balance={budaBalance} isDefault={true} />
          )}

          {apiKey ? (
            <TouchableOpacity onPress={goBudaSync} style={styles.budaIcon}>
              <Avatar
                containerStyle={styles.walletAvatar}
                source={require('../../assets/Images/buda.png')}
                size='large'
                rounded
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={goBudaSync} style={styles.budaIcon}>
              <Avatar
                containerStyle={styles.walletAvatar}
                source={require('../../assets/Images/budaOff.png')}
                size='large'
                rounded
              />
            </TouchableOpacity>
          )}

          {isSplitSync ? (
            <TouchableOpacity style={styles.splitwiseIcon}>
              <Avatar
                containerStyle={styles.plitwiseIcon}
                source={require('../../assets/Images/split.jpg')}
                size='large'
                rounded
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={goSplitwiseSync}
              style={styles.splitwiseIcon}
            >
              <Avatar
                containerStyle={styles.walletAvatar}
                source={require('../../assets/Images/splitOff.png')}
                size='large'
                rounded
              />
            </TouchableOpacity>
          )}

          <Button
            title='Editar'
            type='outline'
            buttonStyle={styles.button}
            titleStyle={styles.textButton}
            onPress={goEdit}
          />
        </View>
      </ThemeProvider>
    </>
  );
}

export default ProfileScreen;
