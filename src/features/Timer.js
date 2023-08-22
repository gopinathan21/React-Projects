import { createSlice } from "@reduxjs/toolkit";

const initialTimerState = {
  inputMinutes: 25,
  valueError: false,
  totalTimeInSeconds: 0,
  timerStarted: false,
  Success: false,
  pauseModal: false,
};

export const timerReducerSlice = createSlice({
  name: "timer",
  initialState: initialTimerState,
  reducers: {
    all: (state, action) => state,
    inputMinutes: (state, action) => {
      state.inputMinutes = action.payload;
    },
    valueError: (state, action) => {
      state.valueError = action.payload;
    },
    totalTimeInSeconds: (state, action) => {
      state.totalTimeInSeconds = action.payload;
    },
    Success: (state, action) => {
      state.Success = action.payload;
    },
    pauseModal: (state, action) => {
      state.pauseModal = action.payload;
    },
    timerStarted: (state, action) => {
      state.timerStarted = action.payload;
    },
  },
});

export const {
  all,
  inputMinutes,
  valueError,
  totalTimeInSeconds,
  Success,
  pauseModal,
  timerStarted,
} = timerReducerSlice.actions;



export const selectTimer = (state) => state;
export const selectTotalTimeInSeconds = (state) =>
  state.timer.totalTimeInSeconds;
