import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'buda',
  initialState: {
    apiKey: null,
    error: null,
    loading: false,
  },
  reducers: {
    confirmKeys(state) {
      state.loading = true;
    },
    confirmSucces(state, action) {
      state.loading = false;
      state.apiKey = action.payload;
    },
    confirmRejected(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },

});

export default slice;

export const actions = slice.actions;
