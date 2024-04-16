import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "./storage";
import userSlice from "./slices/userSlice";
import imageSlice from "./slices/imageSlice";
import Images from './slices/cacheImages';


const persistConfig = {
  key : 'root',
  storage,
  whitelist : ['userSlice']
}



const rootReducer = combineReducers({
  userSlice,imageSlice,Images
})

const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export { store , persistor };