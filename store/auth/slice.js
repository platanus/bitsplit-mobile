import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    error: null,
    apiKey: null,
    loading: false,
  },
  reducers: {
    login(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.token = action.payload.authentication_token;
      state.user = action.payload;
      if (action.payload.api_key) state.apiKey = action.payload.api_key;
    },
    loginRejected(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },

});

export default slice;

export const actions = slice.actions;
