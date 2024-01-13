import { createSlice } from "@reduxjs/toolkit";


let initialState = [];

const followingSlice = createSlice({
    name: "followingArts",
    initialState,
    reducers: {
        addFollowingArts: (state, action) => {
            const { payload: followingArts } = action;
            return followingArts;
        },
        toggleFollowingArtsLike: (state, { payload }) => {
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
        appendFollowingArts: (state, { payload }) => {
            return [...state, ...payload]
        },
        deleteFollowingArts: (state, { payload:pid }) => {
            const prevState = state;
            const newState = prevState.filter((product) => product._id !== pid)
            return newState;
        },
        editFollowingArts: (state, { payload:updatedData }) => {
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

export const { toggleFollowingArtsLike, appendFollowingArts, addFollowingArts, deleteFollowingArts, editFollowingArts } = followingSlice.actions;

export default followingSlice.reducer;