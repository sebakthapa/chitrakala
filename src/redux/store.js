"use client"
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from 'redux-persist';
import { IS_CLIENT } from '@/lib/utils';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';


const rootReducer = combineReducers({
  user: userReducer,
})


// to solve problem
const createNoopStorage = () => {
  return {
     getItem(_key) {
        return Promise.resolve(null);
     },
     setItem(_key, value) {
        return Promise.resolve(value);
     },
     removeItem(_key) {
        return Promise.resolve();
     },
  };
};


// const persistConfig = {
//   key: "root",
//   storage:IS_CLIENT ? createWebStorage("local") : createNoopStorage(),
//   whitelist:["user"]
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware({
  //   serializableCheck: {
  //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, REGISTER, PERSIST],
  //   },
  // }),
});


export default store;

// export const persistor = persistStore(store)