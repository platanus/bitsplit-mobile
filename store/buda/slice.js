import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'buda',
  initialState: {
    apiKey: null,
    error: null,
    loading: false,
    balance: null,
    quotation: null,
    lastPayment: null,
  },
  reducers: {
    start(state) {
      state.loading = true;
    },
    finish(state) {
      state.loading = false;
    },
    setBudaKey(state, action) {
      state.apiKey = action.payload;
    },
    syncBudaRejected(state, action) {
      state.error = action.payload;
    },
    budaBalance(state, action) {
      state.balance = action.payload;
    },
    setQuotations(state, action) {
      state.quotation = action.payload;
    },
    setLastPayment(state, action) {
      state.lastPayment = action.payload;
    },
    unmountLastPayment(state) {
      state.lastPayment = null;
    },
  },

});

export default slice;

export const actions = slice.actions;
