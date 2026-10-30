import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlicer"
import IncidentReducer from './IncidentSlicer'

export const store=configureStore({
    reducer:{
        AuthReducer,
        IncidentReducer

    }
    
})