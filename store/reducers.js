import { combineReducers } from 'redux';
import auth from './auth/slice';
import buda from './buda/slice';
import onstart from './onstart/slice';

export default combineReducers({
  auth: auth.reducer,
  buda: buda.reducer,
  onstart: onstart.reducer,
});
