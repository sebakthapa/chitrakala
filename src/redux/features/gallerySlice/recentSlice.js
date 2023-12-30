const { createSlice } = require("@reduxjs/toolkit");

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
        }
    }
})

export const { toggleRecentArtsLike, appendRecentArts, addRecentArts } = recentSlice.actions;
export default recentSlice.reducer;