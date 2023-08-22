import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    name: "",
    EmailId: "",
};

export const userReducer = createSlice({
  name: "users",
  initialState: initialUserState,
  reducers: {
    add: (state, action) => {
      console.log(action.payload)
      const { name, email } = action.payload;
      state.name = name;
      state.EmailId = email;
    },
  },
});
export const{add} = userReducer.actions

export const selectUser =(state)=>{
console.log(state.users,"userdata select")
 return state.users
} 