import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'buda',
  initialState: {
    apiKey: null,
    error: null,
    loading: false,
    balance: null,
  },
  reducers: {
    syncBuda(state) {
      state.loading = true;
    },
    setBudaKey(state, action) {
      state.loading = false;
      state.apiKey = action.payload;
    },
    syncBudaRejected(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    budaBalance(state, action) {
      state.loading = false;
      state.balance = action.payload;
    },
  },

});

export default slice;

export const actions = slice.actions;
