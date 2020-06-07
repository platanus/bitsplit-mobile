import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  startFlag: true,
};
const slice = createSlice({
  name: 'onstart',
  initialState,
  reducers: {
    finishStart(state) {
      state.startFlag = false;
    },
    resetStartFlag(state) {
      state.startFlag = true;
    },
  },
});

export default slice;

export const actions = slice.actions;
