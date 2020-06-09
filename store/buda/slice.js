import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  apiKey: null,
  error: null,
  loading: false,
  balance: null,
  quotation: null,
  lastPayment: null,
  lastWithdrawal: null,
  lastDeposit: null,
  returnMessage: null,
  payments: [],
};
const slice = createSlice({
  name: 'buda',
  initialState,
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
    syncReturnMessage(state, action) {
      state.returnMessage = action.payload;
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
    setLastWithdrawal(state, action) {
      state.lastWithdrawal = action.payload;
    },
    setLastDeposit(state, action) {
      state.lastDeposit = action.payload;
    },
    setPayments(state, action) {
      state.payments = action.payload;
    },
    addPayment(state, action) {
      state.payments.unshift(action.payload);
    },
    reset() {
      return initialState;
    },
  },
});

export default slice;

export const actions = slice.actions;
