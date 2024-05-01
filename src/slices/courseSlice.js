import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 1,
  editCourse: false,
  editCourseId: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setStep: (state, value) => {
      state.step = value.payload;
    },
    seteditCourse: (state, value) => {
      state.editCourse = value.payload;
    },
    seteditCourseId: (state, value) => {
      state.editCourseId = value.payload;
    },
  },
});

export const { setStep, seteditCourse ,seteditCourseId} = courseSlice.actions;
export default courseSlice.reducer;
