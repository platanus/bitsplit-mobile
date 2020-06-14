import { Text } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppLoading } from 'expo';
import { useFonts } from '@use-expo/font';
import formatCurrency from '../../utils/formatCurrency';
import styles from './styles';
import colors from '../../styles/colors';

function Wallet({ isDefault = false, name, balance }) {
  const [showIn, setShowIn] = useState(true);

  const showCoin = () =>
    showIn
      ? balance.BTC.amount
      : formatCurrency(parseInt(balance.BTC_CLP.amount), 'CLP').slice(3);

  const [fontsLoaded] = useFonts({
    SpaceMonoItalic: require('../../assets/fonts/SpaceMono-BoldItalic.ttf'),
    SpaceMonoRegular: require('../../assets/fonts/SpaceMono-Regular.ttf'),
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
      {/* <Text style={{ fontFamily: 'SpaceMonoItalic'}}>
        {name}
      </Text> */}
      <Text
        style={{ ...styles.titleWallet, ...{ fontFamily: 'SpaceMonoItalic' } }}
      >
        {name}
      </Text>
      <Text
        style={{ ...styles.coinText, ...{ fontFamily: 'SpaceMonoRegular' } }}
      >
        {showCoin()} {showIn ? 'BTC' : 'CLP'}
      </Text>

      <Text
        style={{
          fontFamily: 'SpaceMonoRegular',
          textAlign: 'center',
          color: colors.lightpurple,
        }}
      >
        {isDefault ? 'Wallet Principal' : 'Wallet Secundaria'}
      </Text>
    </TouchableOpacity>
  );
}

export default Wallet;
