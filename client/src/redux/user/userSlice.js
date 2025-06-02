import { createSlice } from "@reduxjs/toolkit";
// Ye createSlice function Redux Toolkit ka ek helper hai jo humare liye Redux reducer aur actions 
// automatically generate karta hai.

// redux slice
const initialState = {
    currentUser : null,
    error : null,
    loading :false
};

// createSlice ek object leta hai jisme:
// name: Slice ka naam.
// initialState: Default state.
// reducers: Sare actions (jaise signInStart, signInSuccess, etc.) ko define karta hai.

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {   // ye do cheezy leta hai   currectState and action  => and always return the new state
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state,action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
          },
          updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
          },
          updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },
          deleteUserStart:(state) =>{
            state.loading = true;
          },
          deleteUserSuccess:(state) =>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
          },
          deleteUserFailure:(state,action) =>{
            state.error = action.payload;
            state.loading = false;
          },
          signOutUserStart: (state) => {
            state.loading = true;
          },
          signOutUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
          },
          signOutUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },
    }
})


//Ye Redux actions ko destructure karke export kar raha hai taake hum components
//  me dispatch() karke unko call kar sakein.

//useDispatch: Store me action send karke state update karata hai through reducer. 
export const { signInStart, 
    signInSuccess, 
    signInFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserFailure,
    deleteUserSuccess,
    signOutUserStart,
    signOutUserSuccess,
    signOutUserFailure
} = userSlice.actions;

//Ye slice ka reducer export kar raha hai jise hum store me use karenge.
export default userSlice.reducer;