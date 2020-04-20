import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'buda',
  initialState: {
    apiKey: null,
    error: null,
    loading: false,
  },
  reducers: {
    syncBuda(state) {
      state.loading = true;
    },
    syncBudaSuccess(state, action) {
      state.loading = false;
      state.apiKey = action.payload.api_key;
    },
    syncBudaRejected(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },

});

export default slice;

export const actions = slice.actions;
