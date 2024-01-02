import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = { counter: 0, showCounter: true };
const counterSlice = createSlice({
  name: "counter",
  initialState: initialCounterState,
  reducers: {
    counterIncrement(state) {
      state.counter++;
    },
    counterDecrement(state) {
      state.counter--;
    },
    counterIncrementByValue(state, action) {
      state.counter = state.counter + action.payload;
    },
    counterToggle(state) {
      state.showCounter = !state.showCounter;
    },
    counterReset(state) {
      state.counter = 0;
    },
  },
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
