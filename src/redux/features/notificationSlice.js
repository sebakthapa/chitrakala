import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = [];
const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers:{
       
        addNotification :(state,action)=>{
            return action.payload
        },
        deleteNotification : (state,action)=>{
            const {payload: notificationId} = action;
            const prevData = [...state]
            return prevData.filter((item)=>item._id!==notificationId)
        },
        clearAllNotification : (state,action)=>{

            return []
        }
    }

}) 


export const {addNotification,deleteNotification,clearAllNotification} = notificationSlice.actions;

export default notificationSlice.reducer
