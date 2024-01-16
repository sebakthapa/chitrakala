import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = [];
const wishListSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers:{
       
        addWishList :(state,action)=>{
            return action.payload
        },
        deleteWishList : (state,action)=>{

            const {payload: wishlistData} = action;
            const prevData = [...state]
            return prevData.filter((item)=>item._id!==wishlistData)
        }
    }

}) 


export const {addWishList,deleteWishList,loadWishList} = wishListSlice.actions;

export default wishListSlice.reducer
