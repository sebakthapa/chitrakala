const { createSlice } = require("@reduxjs/toolkit");

let initialState = [];

const querySlice = createSlice({
    name: "artsQuery",
    initialState,
    reducers: {
        addArtsQuery: (state, action) => {
            const { payload: queryData } = action;
            return [...state, ...queryData];
        },
        removeArtsQuery: (state, action) => {
            const { payload: { type, param } } = action;
            let newArtsQuery = state;
            state.filter((st) => (st.type == type && st.param == param))
        },
        removeArtsQuery: (state, action) => {
            return [];
        },
    }
})

export const { togglePopularArtsLike, appendPopularArts, addPopularArts, sortPopularArts } = querySlice.actions;

export default querySlice.reducer;