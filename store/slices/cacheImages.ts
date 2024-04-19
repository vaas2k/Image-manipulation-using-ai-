import { createSlice } from "@reduxjs/toolkit";

const initialState : any = {
  images : '',
};

const Images = createSlice({
  name: "All_Images",
  initialState,
  reducers: {
    setAllImages : (state,action)=>{
      return action.payload;
    },
    resetCache: (state) => {
        state.images = [];
    }
  },
});


export const {setAllImages ,resetCache} = Images.actions;
export default Images.reducer;
