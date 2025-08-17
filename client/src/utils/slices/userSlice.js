import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user:false,
        token:null
    },
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload;
            return;
        },
        removeUser: (state, action) => {
            state.user = false ;
            state.token = null;
            return ;
        },
        setToken : (state, action) => {
            state.token = action.payload;
        }
    }
});

export const { addUser,removeUser,setToken} = userSlice.actions;
export default userSlice.reducer;