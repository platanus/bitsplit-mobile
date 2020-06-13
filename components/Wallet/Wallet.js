import { Text } from 'react-native';
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
      // style={styles.defaultWallet}
      style={isDefault ? styles.defaultWallet : styles.secondWallet}
    >
      <Text style={styles.titleWallet}>{name}</Text>
      <Text style={styles.coinText}>
        {`${showCoin()} ${showIn.replace('_', ' > ')}`}
      </Text>
      {isDefault && (
        <Text style={styles.defaultWalletText}>{'Wallet predeterminada'}</Text>
      )}
    </TouchableOpacity>
  );
}

export default Wallet;
