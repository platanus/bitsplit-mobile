import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  loading: false,
};
const slice = createSlice({
  name: 'transactions',
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
