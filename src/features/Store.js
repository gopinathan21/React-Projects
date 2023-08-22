import { timerReducerSlice } from "./Timer";
import { configureStore } from "@reduxjs/toolkit";
import { typingSpeedReducerSlice } from "./TypingSpeedStore";
import { userReducer } from "./userData";


export const store = configureStore({reducer :{
    timer:timerReducerSlice.reducer,
    typingSpeed:typingSpeedReducerSlice.reducer,
    users:userReducer.reducer
}})





