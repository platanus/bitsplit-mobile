/* eslint-disable max-statements */
import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { BUDA_AUTH_REQUEST } from '../../store/types';
import style from './styles';

function BudaAuthScreen(props) {
  const { error, loading, balance } = useSelector(state => state.buda);
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  function handleBudaAuth() {
    dispatch({ type: BUDA_AUTH_REQUEST, payload: { apiKey, apiSecret, password } });
  }

  useEffect(() => {
    if (balance) {
      props.navigation.navigate({ routeName: 'Home' });
    }
  }, [balance, props]);

  return (
    <View style={style.screen}>
      <ScrollView style={{ flex: 1 }}>

        <Text h2>{'Autentificación Buda'}</Text>

        <Text h4>{ error }</Text>
        <Input
          id ="API_KEY"
          label="API KEY"
          required
          secureTextEntry
          autoCapitalize="none"
          value={ apiKey }
          onChangeText={ text => setApiKey(text) }
          placeholder='buda api key'
          leftIcon={
            <Icon
              name='key'
              size={24}
              color='black'
            />
          }
        />
        <Input
          id ="API_SECRET"
          label="API SECRET"
          required
          secureTextEntry
          autoCapitalize="none"
          value={apiSecret}
          onChangeText={text => setApiSecret(text)}
          placeholder='buda api secret'
          leftIcon={
            <Icon
              name='user-secret'
              size={24}
              color='black'
            />
          }
        />

        <Input
          id ="password"
          label="Bitsplit Password"
          keyboardType="default"
          secureTextEntry
          required
          minLength={5}
          autoCapitalize="none"
          errorMessage="Ingrese un contrasena valida"
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder='password'
          leftIcon={
            <Icon
              name='lock'
              size={24}
              color='black'
            />
          }
        />
        <Button
          title="send"
          type="solid"
          onPress ={() => handleBudaAuth()}
          loading ={loading}
        />
      </ScrollView>
    </View>
  );
}

BudaAuthScreen.navigationOptions = {
  headerTitle: 'Buda',
};

export default BudaAuthScreen;
