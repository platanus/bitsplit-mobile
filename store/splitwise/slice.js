import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  loading: false,
  authUrl: null,
  debts: { friends_to_user: null, user_to_friends: null },
  isSync: false,
};
const slice = createSlice({
  name: 'splitwise',
  initialState,
  reducers: {
    start(state) {
      state.loading = true;
    },
    finish(state) {
      state.loading = false;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setDebts(state, action) {
      state.debts = action.payload;
      state.isSync = true;
    },
    setAuthUrl(state, action) {
      state.authUrl = action.payload;
    },
    cleanError(state) {
      state.error = null;
    },
    reset() {
      return initialState;
    },
  },
});

export default slice;

export const actions = slice.actions;
