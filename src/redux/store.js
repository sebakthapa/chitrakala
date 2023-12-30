"use client"
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import popularArtsReducer from './features/gallerySlice/popularSlice';
import followingArtsReducer from './features/gallerySlice/followingSlice';
import recentArtsReducer from './features/gallerySlice/recentSlice';


const rootReducer = combineReducers({
  user: userReducer,
  popularArts: popularArtsReducer,
  followingArts: followingArtsReducer,
  recentArts: recentArtsReducer,
})

const store = configureStore({
  reducer: rootReducer,
});


export default store;