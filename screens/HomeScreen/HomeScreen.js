import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { Avatar } from 'react-native-elements';

const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saldoText: {
    fontSize: 30,
    padding: 20,
  }
});

function HomeScreen() {
  const email = useSelector(state => state.auth.user.email);
  const saldo = "70.000";

  return (

    <View style={style.screen}>

    <Avatar
      size="large"
        rounded
        source={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}
      />

      <Text>{`Hola ${email}!`}</Text>

      <Text style={style.saldoText}>{`Saldo ${saldo} `}</Text>





    </View>

  );
}

export default HomeScreen;
