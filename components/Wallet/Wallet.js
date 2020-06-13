import { Text } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import formatCurrency from '../../utils/formatCurrency';
import styles from './styles';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';

function Wallet({ isDefault = false, name, balance }) {
  const [showIn, setShowIn] = useState(true);

  const showCoin = () =>
    showIn
      ? balance.BTC.amount
      : formatCurrency(parseInt(balance.BTC_CLP.amount), 'CLP').slice(3);

  const [fontsLoaded] = useFonts({
    SpaceMonoItalic: require('../../assets/fonts/SpaceMono-BoldItalic.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <TouchableOpacity
      activeOpacity={100}
      onPressIn={() => setShowIn(!showIn)}
      onPressOut={() => setShowIn(!showIn)}
      style={isDefault ? styles.defaultWallet : styles.secondWallet}
    >
      <Text
        style={{ fontFamily: 'SpaceMonoItalic', fontSize: 20, color: 'white' }}
      >
        {name}
      </Text>
      <Text style={styles.coinText}>
        {showCoin()} {showIn ? 'BTC' : 'CLP'}
      </Text>
      {isDefault && (
        <Text style={styles.defaultWalletText}>{'Wallet predeterminada'}</Text>
      )}
    </TouchableOpacity>
  );
}

export default Wallet;
