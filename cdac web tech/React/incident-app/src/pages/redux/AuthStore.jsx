import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlicer"

export const authStore=configureStore({
reducer:{
    AuthReducer:AuthReducer
}
})