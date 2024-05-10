'use server';
import { configureStore } from '@reduxjs/toolkit'
import user from './slices/userSlice';
// ...

export const store = configureStore({
  reducer: { 
    user
  },
})

export type AppDispatch = typeof store.dispatch