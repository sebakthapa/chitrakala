const { createSlice } = require("@reduxjs/toolkit");

let initialState = [];

const followingSlice = createSlice({
    name: "followingArts",
    initialState,
    reducers: {
        addFollowingArts: (state, action) => {
            const { payload: followingArts } = action;
            return followingArts;
        },
        toggleArtLike: (state, { payload }) => {
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
        }
    }
})

export const { toggleArtLike, appendFollowingArts, addFollowingArts } = followingSlice.actions;

export default followingSlice.reducer;