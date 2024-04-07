import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice';
import imageSlice from './slices/imageSlice';

export const store = configureStore({
reducer: { userSlice,imageSlice }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch