const { createSlice } = require("@reduxjs/toolkit");

let initialState = [];

const newSlice = createSlice({
    name: "newArts",
    initialState,
    reducers: {
        addNewArts: (state, action) => {
            const { payload: newArts } = action;
            return newArts;
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
        appendNewArts: (state, { payload }) => {
            return [...state, ...payload]
        }
    }
})

export const { toggleArtLike, appendNewArts, addNewArts } = newSlice.actions;
export default newSlice.reducer;