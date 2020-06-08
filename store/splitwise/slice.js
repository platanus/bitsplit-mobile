import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  loading: false,
  debts: { friends_to_user: null, user_to_friends: null },
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
