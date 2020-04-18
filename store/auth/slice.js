import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
    name: 'auth',
    initialState:{
        token:null,
        user: null,
        error: null,
        loading: false,
        test : 2
    },
    reducers: {
        tests(state, action){
            state.test += action.payload
        },
        login(state){
            state.loading = true
        },
        loginSucces(state, action){
            console.log('reducer', action)
            state.loading = false;
            state.token = action.payload.authentication_token;
            state.user = action.payload
            console.log('state', state)
        },
        loginRejected(state, action){
            state.loading =  false;
            state.error = action.payload
        }
    }

});

export default slice;

export const actions = slice.actions;