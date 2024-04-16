import { createSlice } from "@reduxjs/toolkit";

const initialState : any = {
  images : '',
};

const Images = createSlice({
  name: "All_Images",
  initialState,
  reducers: {
    setAllImages : (state,action)=>{
       if(!state.images){
         state.images = action.payload.images;
       }
       else{
        for(let i = 0; i < action.payload.images.length; i++){
          state.images!.push(action.payload.images[i]);
        }
       }

    },
    resetCache: (state) => {
        state.images = [];
    }
  },
});


export const {setAllImages ,resetCache} = Images.actions;
export default Images.reducer;
