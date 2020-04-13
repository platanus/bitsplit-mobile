import { combineReducers } from 'redux';
import  auth  from './auth/slice';


export default combineReducers({
	auth : auth.reducer,

});