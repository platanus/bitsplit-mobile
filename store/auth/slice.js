/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: undefined,
  user: undefined,
  error: undefined,
  loading: false,
  pin: undefined,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    start(state) {
      state.loading = true;
    },
    finish(state) {
      state.loading = false;
    },
    loginSuccess(state, action) {
      state.token = action.payload.authentication_token;
      if (!state.user) state.user = { email: action.payload.email };
    },
    fetchUser(state, action) {
      state.user = action.payload;
      if (action.payload.api_key) state.apiKey = action.payload.api_key;
    },
    setPin(state, action) {
      state.pin = action.payload;
    },
    loginRejected(state, action) {
      state.error = action.payload;
    },
    logout(state) {
      state.token = null;
    },
    reset() {
      return initialState;
    },
  },
});

export default slice;

export const actions = slice.actions;
