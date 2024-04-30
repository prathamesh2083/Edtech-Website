import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep:(state, value) => {
      state.step = value.payload
    },
  },
});

export const { setStep } = courseSlice.actions;
export default courseSlice.reducer;
