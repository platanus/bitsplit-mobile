import { call, put, takeLatest } from 'redux-saga/effects';
import {actions as authActions} from './slice';
import {LOGIN_REQUEST,LOGIN_SUCCES, TEST} from '../types';
import {loginApi} from '../../utils/api';

function* login_request(action){
    console.log('LOGIN',action)
    try{
        const {data} = yield call(loginApi, action.payload)
        console.log('login saga result', data)
        yield put(authActions.loginSucces(data.data.attributes.authentication_token))
    } catch(err){
        console.log('Login Error', err)
    }

    
}
function* tests(action){
    try{
        yield put(authActions.tests(action.payload))
    } catch (error){
        console.log(error)
    }
}


export default function* loginSaga(){
    yield takeLatest(LOGIN_REQUEST, login_request)
    yield takeLatest(TEST, tests)
}