import { createSlice } from "@reduxjs/toolkit";


const authslice=createSlice({
    name:'auth',
    initialState:{
        isLogin:false,
        msg:''
    },
    reducers:{
        authProcess:function(state,action){ //action for payloads(user input)
            const dbEmail ="admin@gmail.com"
            const dbPassword='admin@123'
            const{email,password}=action.payload
            if(dbEmail===email && dbPassword===password.trim()){
                state.isLogin=true
                state.msg="Login Successfull"
            }
            else{
                state.isLogin=false
                state.msg='Login Failed'
            }
        },
        register:function(state, action){

        },
        logout:function(state,action){

        }
    }
})

export const{authProcess,register,logout}=authslice.actions //u will get all the fuction as a obj
export default authslice.reducer  //reducer export
