import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

// Define a type for the slice state
type ScoreState = number;

// Define the initial state using that type
const initialState: ScoreState = 0;

export const scoreSlice = createSlice({
  name: "score",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state += 1;
    },
    decrement: (state) => {
      state -= 1;
    },
  },
});

export const { increment, decrement } = scoreSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectScore = (state: RootState) => state.score;

export default scoreSlice.reducer;
