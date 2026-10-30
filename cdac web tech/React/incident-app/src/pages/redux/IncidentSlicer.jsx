import { createSlice } from "@reduxjs/toolkit";
import { mockIncidents } from "../../data/incidents";

const incidentSlice=createSlice({
    name:"incident",
    initialState:{
        incidents:[...mockIncidents],
        error:'',
        msg:""
    }, 
    reducers:{
        updateIncidents:function(state,action){
            console.log(action.payload,"update incident")
        },
        deleteIncident:function (state,action) {
            console.log(action.payload, "delete incident")
        }
    }
})

export const{updateIncidents,deleteIncident}=incidentSlice.actions
export default incidentSlice.reducer