const { createSlice } = require("@reduxjs/toolkit");

let initialState = null;

const gallerySlice = createSlice({
    name: "gallery",
    initialState,
    reducers: {
        addGalleryData: (state, action) => {
            const { payload: galleryData } = action;
            return galleryData;
        },
        addSingleGalleryData: (state, action) => {
            const { payload: singleGalleryData } = action;
            return [...state, singleGalleryData];
        },
        toggleArtLike: (state, { payload }) => {
            const { userId, productId } = payload;
            const newState = state.map((item) => {
                let newLikes = [...item.likes];

                if (item.likes.includes(userId)) { // already liked remove userid from array
                    newLikes = newLikes.filter((id) => id !== userId)
                } else { //not liked add userid to the array
                    newLikes.push(userId)
                }
                return item._id == productId ? { ...item, likes: newLikes } : item;
            })

            return newState;
        }

    }
})

export const { toggleArtLike, addSingleGalleryData, addGalleryData } = gallerySlice.actions;

export default gallerySlice.reducer;