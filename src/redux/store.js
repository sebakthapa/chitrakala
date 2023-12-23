"use client"
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import popularArtsReducer from './features/gallerySlice/popularSlice';
import followingArtsReducer from './features/gallerySlice/followingSlice';
import newArtsReducer from './features/gallerySlice/newSlice';


const rootReducer = combineReducers({
  user: userReducer,
  popularArts: popularArtsReducer,
  followingArts: followingArtsReducer,
  newArts: newArtsReducer,
})

const store = configureStore({
  reducer: rootReducer,
});


export default store;