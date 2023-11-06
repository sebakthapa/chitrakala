const { createSlice } = require("@reduxjs/toolkit");

let initialState = null ;

const userSlice = createSlice({
    name: "user",
    initialState ,
    reducers: {
        addUserData:  (state, action) => {
            const { payload: userData } = action;
            // const { address, photo, displayName,user  } = userData;
            // const { email, username, phone, _id } = user;
            // const formatedUserData = {uid:_id, username, email, phone, address, displayName, photo, }
            return userData;
        },

        clearUserData: (state, action) => {
            return null;
        },

    }
})

export const { addUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;