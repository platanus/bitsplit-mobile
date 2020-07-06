import React from 'react';
import { ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import formatCurrency from '../../utils/formatCurrency';
import styles from './styles';
import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';

const Debt = ({
  id,
  first_name,
  last_name,
  amount,
  from,
  currency_code,
  picture,
  email,
  group_id,
  to_user_id,
}) => {
  const navigation = useNavigation();
  const name = `${first_name} ${last_name || ''}`;
  const onPress = () => {
    navigation.navigate('Splitwise', {
      screen: 'PaySplitwiseDebt',
      params: {
        title: `Pagar a ${name}`,
        amount,
        currency_code,
        name,
        email,
        group_id,
        to_user_id: id,
      },
    });
  };
  const chevron = { color: colors.purple };
  const canPay = !from && currency_code === 'CLP';
  const payProps = canPay ? { onPress, chevron } : {};

  return (
    <ListItem
      key={id}
      title={name}
      titleStyle={from ? styles.from : styles.to}
      Component={TouchableScale}
      friction={90}
      tension={100}
      activeScale={0.95}
      containerStyle={from ? styles.received : styles.sent}
      leftAvatar={{
        source: {
          uri: picture,
        },
      }}
      subtitleStyle={{
        fontFamily: 'SpaceMonoRegular',
        color: colors.darkpurple,
        fontSize: 15,
      }}
      subtitle={`${from ? 'Te debe' : 'Debes'} ${formatCurrency(
        amount,
        currency_code
      )}`}
      bottomDivider
      {...payProps}
    />
  );
};

export default Debt;
