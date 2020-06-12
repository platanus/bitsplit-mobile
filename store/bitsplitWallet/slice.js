import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  loading: false,
  balance: {
    BTC: {
      amount: 0,
    },
    BTC_CLP: {
      amount: 0.0,
    },
  },
};
const slice = createSlice({
  name: 'bitsplitWallet',
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
    setBalance(state, action) {
      state.balance = action.payload;
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
