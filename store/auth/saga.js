import { call, put, takeLatest } from 'redux-saga/effects';
import {actions as authActions} from './slice';
import {LOGIN_REQUEST, REGISTER_REQUEST} from '../types';
import api from '../../utils/api';

console.log(api)
function* login_request(action){
    console.log('LOGIN',action)
    try{
        //const attributes = null
        yield put(authActions.login())
        const {data: {data: {attributes}}} = yield call(api.loginApi, action.payload)
        if(attributes){
            yield put(authActions.loginSucces(attributes))
        }else{
            yield put(authActions.loginRejected('Usuario y contraseña no coinciden'))
        }
    } catch(err){
        console.log('Login Error', err)
        yield put(authActions.loginRejected(err.toString()))
    }
}

function* register(action){
    try{
        yield put(authActions.login())
        const {data: {data: {attributes}}} = yield call(api.signUpApi, action.payload)
        if(attributes){
            yield put(authActions.loginSucces(attributes))
        }else{
            yield put(authActions.loginRejected('Error registrando'))
        }
    } catch(err){
        console.log('Login Error', err)
        yield put(authActions.loginRejected(err.toString()))
    }
}

export default function* loginSaga(){
    yield takeLatest(LOGIN_REQUEST, login_request)
    yield takeLatest(REGISTER_REQUEST, register)
}