import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    password: null,
    isLoggedIn: false,
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username
            state.password = action.payload.password
            state.isLoggedIn = true
        },
        logout: (state) => {
            state = initialState
        }
    }
})


export const { login, logout } = authSlice.actions


export default authSlice.reducer