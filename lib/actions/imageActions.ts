'use server'
import { imageVal } from "@/types/types";
import { connectToDatabase } from "../database/database";
import ImageModel from "../database/model/image";
import { handleError } from "../utils";

export const saveImage = async (imageProps: imageVal) => {
  try {
    await connectToDatabase();
  } catch (error) {
    handleError(error);
  }

  try {
    const save_image = new ImageModel({
      title: imageProps.title,
      type: imageProps.type,
      image_url: imageProps.image,
      width: imageProps.width,
      height: imageProps.height,
      aspect_ratio: imageProps.aspect_ratio,
      color: imageProps.color,
      object_recolor: imageProps.object_recolor,
      prompt: imageProps.Prompt,
      transformation_url: imageProps.transformation_url,
      author: imageProps.author,
      author_img: imageProps.author_img,
    });
    await save_image.save();
    console.log("image upload to db");
  } catch (error) {
    handleError(error);
  }
};

export async function text_to_image(data: any) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const blob = await response.blob();
  const imageUrl = URL.createObjectURL(blob);
  console.log(imageUrl);
  return imageUrl;
}

