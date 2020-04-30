import React from 'react';
import styles from './styles';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';

function RecordScreen(props) {
  return (
    <View style={styles.screen}>

      <Text>Insertar pagos</Text>

    </View>

  );
}

RecordScreen.navigationOptions = navData => ({
  headerTitle: 'Historial de Pagos',
  headerLeft: () => (
    <Button
      onPress={() => {
        navData.navigation.toggleDrawer();
      }}
    />
  ),
});

export default RecordScreen;

