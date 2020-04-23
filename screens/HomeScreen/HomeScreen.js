import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Avatar } from 'react-native-elements';
import styles from './styles';

function HomeScreen() {
  const email = useSelector(state => state.auth.user.email);
  const saldo = 70000;

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

      <Text style={styles.saldoText}>{`Saldo ${saldo} `}</Text>

    </View>

  );
}

export default HomeScreen;
