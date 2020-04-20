import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Avatar } from 'react-native-elements';
import { styles, saldoText } from '../../components/styles';

function HomeScreen(props) {
  const { auth: { user: { email } }, buda: { apiKey } } = useSelector(state => state);
  const saldo = 70000;

  useEffect(() => {
    if (!apiKey) {
      props.navigation.navigate({ routeName: 'BudaAuth' });
    }
  });

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

      <Text style={saldoText}>{`Saldo ${saldo} `}</Text>

    </View>

  );
}

export default HomeScreen;
