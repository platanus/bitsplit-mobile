import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import styles from './styles';

function PaymentHistoryScreen(props) {
  return (
    <View style={styles.screen}>

      <Text>Insertar pagos</Text>

    </View>

  );
}

PaymentHistoryScreen.navigationOptions = navData => ({
  headerTitle: 'Historial de Pagos',
  headerLeft: () => (
    <Button
      onPress={() => {
        navData.navigation.toggleDrawer();
      }}
    />
  ),
});

export default PaymentHistoryScreen;

