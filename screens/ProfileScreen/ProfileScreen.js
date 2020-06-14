import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button, ThemeProvider } from 'react-native-elements';
import { SPLITWISE_GET_DEBTS } from '../../store/types';
import styles from './styles';
import Header from '../../components/Header';
import Theme from '../../styles/Theme';

function useProfile() {
  const {
    auth: {
      user: { email },
    },
    buda: { apiKey, loading: budaLoading },
    splitwise: { isSync: isSplitSync, loading: splitwiseLoading },
  } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isSplitSync) {
      dispatch({ type: SPLITWISE_GET_DEBTS });
    }
  }, [isSplitSync]);

  const navegation = useNavigation();
  const goBudaSync = () => navegation.navigate('Buda');

  return {
    email,
    apiKey,
    budaLoading,
    isSplitSync,
    splitwiseLoading,
    goBudaSync,
  };
}

function ProfileScreen() {
  const {
    email,
    apiKey,
    budaLoading,
    splitwiseLoading,
    isSplitSync,
    goBudaSync,
  } = useProfile();

  return (
    <>
      <Header title='Perfil' />
      <ThemeProvider theme={Theme}>
        <View style={styles.screen}>
          <Avatar
            containerStyle={styles.avatar}
            source={require('../../assets/Images/spacemonkey.png')}
          />
          <Text
            style={{
              ...styles.nameText,
              ...{ fontFamily: 'SpaceMonoRegular' },
            }}
          >
            Astronaut Monkey
          </Text>
          <Text
            style={{
              ...styles.emailText,
              ...{ fontFamily: 'SpaceMonoRegular' },
            }}
          >{`${email}`}</Text>
          <Text
            style={{
              ...styles.walletText,
              ...{ fontFamily: 'SpaceMonoRegular' },
            }}
          >
            Wallet BitSplit
          </Text>

          {apiKey ? (
            <View style={styles.appWallet}>
              <Avatar
                containerStyle={styles.walletAvatar}
                source={require('../../assets/Images/buda.png')}
                size='medium'
                rounded
              />
              <View>
                <Text
                  style={{
                    ...styles.titleText,
                    ...{ fontFamily: 'SpaceMonoRegular' },
                  }}
                >
                  Conectado a Buda Wallet
                </Text>
                <Button
                  title={'Actualizar Keys'}
                  type='outline'
                  onPress={goBudaSync}
                  buttonStyle={styles.syncButton}
                  titleStyle={{
                    ...styles.syncTextButton,
                    ...{ fontFamily: 'SpaceMonoRegular' },
                  }}
                />
              </View>
            </View>
          ) : (
            <View>
              <View style={styles.syncBudaLeft}>
                <Text style={styles.syncText}>
                  {budaLoading || 'Sync Buda'}
                </Text>
                <Text style={styles.syncTextBody}>
                  Envia y recibe Bitcoins!
                </Text>
              </View>
              <TouchableOpacity style={styles.syncBuda} onPress={goBudaSync}>
                <Avatar
                  containerStyle={styles.syncAvatar}
                  source={require('../../assets/Images/buda.png')}
                  size='medium'
                  rounded
                />
              </TouchableOpacity>
            </View>
          )}

          {isSplitSync ? (
            <View style={styles.appWallet}>
              <Avatar
                containerStyle={styles.walletAvatar}
                source={require('../../assets/Images/split.jpg')}
                size='medium'
                rounded
              />
              <View>
                <Text
                  style={{
                    ...styles.titleText,
                    ...{ fontFamily: 'SpaceMonoRegular' },
                  }}
                >
                  Conectado a Splitwise
                </Text>
              </View>
            </View>
          ) : (
            <View>
              <Text style={styles.syncText}>
                {splitwiseLoading || 'Sync SplitWise'}
              </Text>
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

          <Button
            title='Editar'
            type='outline'
            buttonStyle={styles.button}
            titleStyle={{
              ...styles.textButton,
              ...{ fontFamily: 'SpaceMonoRegular' },
            }}
          />
        </View>
      </ThemeProvider>
    </>
  );
}

export default ProfileScreen;
