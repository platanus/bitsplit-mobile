import { call, put, takeLatest } from 'redux-saga/effects';
import {actions as authActions} from './slice';
import {LOGIN_SUCCES, TEST} from '../types';

function* login(action){
    console.log('LOGIN',action)
}
function* tests(action){
    try{
        yield put(authActions.tests(action.payload))
    } catch (error){
        console.log(error)
    }
}


export default function* loginSaga(){
    yield takeLatest(LOGIN_SUCCES, login)
    yield takeLatest(TEST, tests)
}