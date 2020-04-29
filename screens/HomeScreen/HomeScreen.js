import React from 'react';
import { View, Text, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { Avatar, Button, Badge } from 'react-native-elements';
// import { HeaderButton, Item } from 'react-navigation-header-buttons';
import styles from './styles';
// import HeaderButtons from '../../components/HeaderButton';

function HomeScreen(props) {
  const { auth: { user: { email } }, buda: { apiKey, balance } } = useSelector(state => state);

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
      <Badge value={apiKey ? 'Sincronizado con Buda' : 'Falta Sincronizar'} status={apiKey ? 'success' : 'error' } />
      <Text>{`Hola ${email}!`}</Text>

      {apiKey ?
        <View>
          <Text style={styles.saldoText}>{`Saldo \n${balance.BTC.amount} BTC\n${balance.CLP.amount} CLP `}</Text>
          <Button
            title= 'Generar Pago'
            type="solid"
            onPress ={() => props.navigation.navigate({ routeName: 'Payment' })}
          />
        </View> :
        <View>
          <Text style={styles.saldoText}>{'Debes sincronizar con Buda'}</Text>
          <Button
            title= 'Sincronizar'
            type="solid"
            onPress ={() => props.navigation.navigate({ routeName: 'BudaAuth' })}
          />
        </View>
      }

    </View>

  );
}

// HomeScreen.navigationOptions = navData => ({
//   headerTitle: 'Perfil',
//   headerLeft: (
//     <HeaderButtons HeaderButtonsComponent={HeaderButton}>
//       <Item
//         title='Menu'
//         conName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
//         onPress={() => {
//           navData.navigation.toggleDrawer();
//         }}
//       />
//     </HeaderButtons>
//   ),
// });

export default HomeScreen;
