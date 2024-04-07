import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'
import { stat } from 'fs'
import { CreateUser } from '@/types/types'

const initialState: CreateUser = {
    clerkId : '' ,
    username : '',
    email: '',
    credits : null,
    firstName : '',
    lastName : '',
    plan : 0
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUser : (state,action)=>{
            state.username = action.payload.user;
            state.clerkId = action.payload.clerkId;
            state.email = action.payload.email;
            state.credits = action.payload.credits;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.plan = action.payload.plan;
        },
        resetUser:(state)=>{
            state.username = '';
            state.clerkId = '';
            state.email = '';
            state.credits = null;
        }
    }
})


export const {setUser, resetUser} = userSlice.actions;
export default userSlice.reducer;

