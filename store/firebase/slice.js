import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  loading: false,
};
const slice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    start(state) {
      state.loading = true;
    },
    finish(state) {
      state.loading = false;
    },
    firebaseRejected(state, action) {
      state.error = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export default slice;

export const actions = slice.actions;
