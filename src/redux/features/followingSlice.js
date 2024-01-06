const { createSlice } = require("@reduxjs/toolkit")

const initialState = null

const followingSlice = createSlice({
    name: "followingArtists",
    initialState,
    reducers: {
        toggleFollowing: (state, action) => {
            const { payload: artistId } = action;
            let followingArray = state
            if (followingArray?.includes(artistId)) {
                followingArray = followingArray.filter((id) => id != artistId)
            } else {
                followingArray = [...followingArray, artistId]
            }

            return followingArray
        },
        addFollowingData: (state, action) => {
            return action.payload
        }
    }
})

export default followingSlice.reducer;
export const { toggleFollowing, addFollowingData } = followingSlice.actions

