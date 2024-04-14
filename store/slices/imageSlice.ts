import { createSlice } from "@reduxjs/toolkit";
import { imageVal } from "@/types/types";

const initialState: imageVal = {
  image : "",
  title: "",
  type: "",
  width: 0,
  height: 0,
  aspect_ratio: "",
  color: "",
  Prompt: "",
  transformation_url: "",
  object_recolor : '',
  author: "",
  author_img : "",
};

const imageSlice = createSlice({
  name: "imageSlice",
  initialState,
  reducers: {
    setImage: (state, action) => {
        // Destructure the payload for better readability
      const {
        image,
        title,
        type,
        width,
        height,
        aspect_ratio,
        config,
        color,
        Prompt,
        transformation_url,
        author,
        object_recolor,
        author_img,
      } = action.payload;

      // Assign individual fields to the state
      state.image = image;
      state.title = title;
      state.type = type;
      state.width = width;
      state.height = height;
      state.aspect_ratio = aspect_ratio;
      state.config = config;
      state.color = color;
      state.object_recolor = object_recolor;
      state.Prompt = Prompt;
      state.transformation_url = transformation_url;
      state.author = author;
      state.author_img = author_img;
    },
    resetImage: (state, action) => {
        return initialState;
    },
  },
});


export const {setImage ,resetImage} = imageSlice.actions;
export default imageSlice.reducer;
