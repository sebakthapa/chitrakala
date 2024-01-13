import { createSlice } from "@reduxjs/toolkit";


let initialState = [];

const recentSlice = createSlice({
    name: "recentArts",
    initialState,
    reducers: {
        addRecentArts: (state, action) => {
            const { payload: recentArts } = action;
            return recentArts;
        },
        toggleRecentArtsLike: (state, { payload }) => {
            const { userId, productId } = payload;
            const newState = state?.map((item) => {
                let newLikes = [...item.likes];

                if (item.likes.includes(userId)) { // already liked remove userid from array
                    newLikes = newLikes.filter((id) => id !== userId)
                } else { //not liked add userid to the array
                    newLikes.push(userId)
                }
                return item._id == productId ? { ...item, likes: newLikes } : item;
            })

            return newState;
        },
        appendRecentArts: (state, { payload }) => {
            return [...state, ...payload]
        },
        deleteRecentArts: (state, { payload:pid }) => {
            const prevState = state;
            const newState = prevState.filter((product) => product._id !== pid)
            return newState;
        },
        editRecentArts: (state, { payload:updatedData }) => {
            const prevState = state;
            const newState = prevState.map((prod) => {
                if (prod._id == updatedData.id) {
                    return {...prod, ...updatedData}
                }
                return prod;
            })
            return newState;
        },
    }
})

export const { toggleRecentArtsLike, appendRecentArts, addRecentArts, deleteRecentArts, editRecentArts } = recentSlice.actions;
export default recentSlice.reducer;