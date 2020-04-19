import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function HomeScreen() {
  const email = useSelector(state => state.auth.user.email);

  return (
    <View style={style.screen}>
      <Text>{`Hola ${email}!`}</Text>

    </View>

  );
}

export default HomeScreen;
