import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { styles, saldoText } from '../../components/styles';

function HomeScreen(props) {
  const { auth: { user: { email } }, buda: { apiKey, balance } } = useSelector(state => state);

  useEffect(() => {
    if (!apiKey) {
      props.navigation.navigate({ routeName: 'BudaAuth' });
    }
  });
  function showBalance() {
    if (balance) {
      return <Text style={saldoText}>{`Saldo \n${balance.BTC.amount} BTC\n${balance.CLP.amount} CLP `}</Text>;
    }

    return <Text style={saldoText}>{'Tu saldo no esta actualizado'}</Text>;
  }

  return (
    <View style={styles.screen}>
      <Avatar
        size="large"
        rounded
        source={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}
      />
      <Text>{`Hola ${email}!`}</Text>

      {showBalance()}
    </View>

  );
}

export default HomeScreen;
