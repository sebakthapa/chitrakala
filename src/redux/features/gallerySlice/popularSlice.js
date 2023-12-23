const { createSlice } = require("@reduxjs/toolkit");

let initialState = [];

const popularSlice = createSlice({
    name: "popularArts",
    initialState,
    reducers: {
        addPopularArts: (state, action) => {
            const { payload: popularArts } = action;
            return popularArts;
        },
        togglePopularArtsLike: (state, { payload }) => {
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
        appendPopularArts: (state, { payload }) => {
            return [...state, ...payload]
        }
    }
})

export const { togglePopularArtsLike, appendPopularArts, addPopularArts } = popularSlice.actions;

export default popularSlice.reducer;