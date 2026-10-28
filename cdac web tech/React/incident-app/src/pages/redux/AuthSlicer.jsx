import { createSlice } from "@reduxjs/toolkit";


const authslice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
        msg: ''
    },
    reducers: {
        authProcess: function (state, action) { //action for payloads(user input)
            const dbEmail = "admin@gmail.com"
            const dbPassword = 'admin@123'
            const { email, password } = action.payload
            if (dbEmail === email && dbPassword === password.trim()) {
                state.isLogin = true
                state.msg = "Login Successfull",
                    state.user = { email, password }

            }
            else {
                state.isLogin = false
                state.msg = 'Login Failed'
                state.user = null
            }
        },
        register: function (state, action) {

        },
        logout: function (state, action) {
            state.isLogin = false
            state.msg = 'Logout Successfull'
            state.user = null
        }
    }
})

export const { authProcess, register, logout } = authslice.actions //u will get all the fuction as a obj
export default authslice.reducer  //reducer export
