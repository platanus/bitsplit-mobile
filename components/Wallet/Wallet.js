import { Text, View } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import formatCurrency from '../../utils/formatCurrency';
import styles from './styles';

function Wallet({ isDefault = false, name, balance }) {
  const [showIn, setShowIn] = useState('BTC');

  const showCoin = () =>
    showIn === 'BTC'
      ? balance[showIn].amount
      : formatCurrency(parseInt(balance[showIn].amount), 'CLP').slice(1);

  return (
    <TouchableOpacity
      activeOpacity={100}
      onPressIn={() => setShowIn(() => 'BTC_CLP')}
      onPressOut={() => setShowIn(() => 'BTC')}
      style={styles.componentContainer}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{name}</Text>
        {isDefault && (
          <Text style={styles.defaultWalletText}>{'Tu Wallet\nx defecto'}</Text>
        )}
      </View>
      <Text style={styles.coinText}>
        {`Saldo ${showIn.replace('_', ' > ')}
                ${showCoin()} `}
      </Text>
    </TouchableOpacity>
  );
}

export default Wallet;
