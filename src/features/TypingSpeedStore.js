import { createSlice } from "@reduxjs/toolkit";

const initialTypingSpeed = {
    reset:false,
    resetModal:false
}

export const typingSpeedReducerSlice = createSlice({

    name: "typingSpeed",
    initialState:initialTypingSpeed,
    reducers:{
        toggleReset: (state, action) =>{
            state.reset = action.payload
        },
        toggleResetModal: (state,action)=>{
            state.resetModal = action.payload
        }
    }

});

export const {toggleReset,toggleResetModal} = typingSpeedReducerSlice.actions;