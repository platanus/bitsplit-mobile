import { combineReducers } from 'redux';
import auth from './auth/slice';
import buda from './buda/slice';

export default combineReducers({
  auth: auth.reducer,
  buda: buda.reducer,

});
