import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/store'

// Define a type for the slice state
interface userSlice {
  username: string | number,
  profile:string
}

// Define the initial state using that type
const initialState: userSlice = {
  username : '',
  profile : ''
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUser:(state,action)=>{
        return action.payload;
    },
    resetUser:(state,action)=>{
        const obj : userSlice = {
            username:'',
            profile:''
        }
        state = obj;
    }    
  },
})

export const { setUser, resetUser} = userSlice.actions
export default userSlice.reducer