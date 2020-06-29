import React from 'react';
import formatCurrency from '../../utils/formatCurrency';
import styles from './styles';
import { ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import colors from '../../styles/colors';

function Debt({ id, first_name, last_name, amount, from, currency_code }) {
  return (
    <ListItem
      key={id}
      title={`${first_name} ${last_name || ''}`}
      titleStyle={from ? styles.from : styles.to}
      Component={TouchableScale}
      friction={90}
      tension={100}
      activeScale={0.95}
      containerStyle={from ? styles.received : styles.sent}
      leftAvatar={{
        source: {
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
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
    />
  );
}

export default Debt;
