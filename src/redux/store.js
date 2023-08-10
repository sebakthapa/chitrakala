import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import storage from "redux-persist/lib/storage"
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from 'redux-persist';


const rootReducer = combineReducers({
  user: userReducer,
})

const persistConfig = {
  key: "root",
  storage,
  // timeout: 1000,
  whitelist:["user"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});


export default store;

export const persistor = persistStore(store)