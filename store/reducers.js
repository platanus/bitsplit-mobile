import { combineReducers } from 'redux';
import auth from './auth/slice';
import buda from './buda/slice';
import onstart from './onstart/slice';
import splitwise from './splitwise/slice';
import bitsplitWallet from './bitsplitWallet/slice';
import transactions from './transactions/slice';

export default combineReducers({
  auth: auth.reducer,
  buda: buda.reducer,
  onstart: onstart.reducer,
  splitwise: splitwise.reducer,
  bitsplitWallet: bitsplitWallet.reducer,
  transactions: transactions.reducer,
});
