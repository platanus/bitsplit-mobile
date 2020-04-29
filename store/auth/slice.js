import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    error: null,
    loading: false,
  },
  reducers: {
    start(state) {
      state.loading = true;
    },
    finish(state) {
      state.loading = false;
    },
    loginSuccess(state, action) {
      state.token = action.payload.authentication_token;
      state.user = action.payload;
      if (action.payload.api_key) state.apiKey = action.payload.api_key;
    },
    loginRejected(state, action) {
      state.error = action.payload;
    },
  },

});

export default slice;

export const actions = slice.actions;
