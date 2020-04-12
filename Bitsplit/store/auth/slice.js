import { createSlice } from "@reduxjs/toolkit";


const slice = createSlice({
    name: 'auth',
    initialState:{
        token:null,
        user: null,
        error: null,
        loading: false,
        test : 37
    },
    reducers: {
        tests(state){
            state.test +=1 
        },
        login(state){
            state.loading = true
        },
        loginSucces(state, action){
            state.loading = false;
            state.token = action.payload;
        },
        loginRejected(state, action){
            state.loading =  false;
            state.error = action.payload
        }
    }

});

export default slice;

export const actions = slice.actions;