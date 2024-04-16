"use client";
import { Flex, Text, Stack } from "@chakra-ui/react";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { MediaUploader } from "./mediaUploader";
import { Transformed_Image } from "./transformed_image";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setImage } from "@/store/slices/imageSlice";
import { useToast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { setUser } from "@/store/slices/userSlice";
import { imageVal } from "@/types/types";
import { saveImage } from "@/lib/actions/imageActions";
import { useCredits } from "@/lib/actions/userActions";

export const ImageForm = ({ configs }: any) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState<any>({
    image: "",
    width: "",
    height: "",
    publicId: "",
  });
  const [transforming_img, setTransforming_img] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [saving_img, setSaving_img] = useState<boolean>(false);
  const imageState = useAppSelector((state) => { return state.imageSlice });
  const cur_user = useAppSelector((state) => {
    return state.userSlice;
  });

  async function onSubmit() {
    setTransforming_img(true);

    if (imageState.transformation_url) {
      dispatch(
        setImage({
          ...imageState,
          transformation_url: "",
          width: "",
          height: "",
        })
      );
    }

    setTimeout(() => {
      dispatch(
        setImage({
          ...imageState,
          transformation_url: selectedImage.image,
          width: selectedImage.width,
          height: selectedImage.height,
        })
      );
      setTransforming_img(false);
      toast({
        title: "Image Transformation Done",
        description: "1 credit was deducted from your account",
        duration: 5000,
        className: "success-toast",
      });
    }, 3000);
    dispatch(
      setUser({
        ...cur_user,
        credits: cur_user.credits! - 1,
      })
    );
    await useCredits(cur_user._id!,cur_user.credits);
  }

  async function saveimagetoDB() {
    setError('');
    if(!imageState.title){setError('title')}
    setSaving_img(true);
    const img: imageVal = {
      image: imageState.image || selectedImage.image,
      title: imageState.title,
      type: imageState.type,
      width: imageState.width,
      height: imageState.height,
      aspect_ratio: imageState.aspect_ratio || null,
      color: imageState.color || null,
      object_recolor: imageState.object_recolor || null,
      Prompt: imageState.Prompt || null,
      transformation_url: imageState.transformation_url,
      author: imageState.author,
      author_img: imageState.author_img,
    };

    const save = await saveImage(img);
    if(save){
      setSaving_img(false);
      toast({
        title: "Image Saved Successfully",
        duration: 5000,
        className: "success-toast",
      });
    }
    else{
      setSaving_img(false);
      toast({
        title: "Error While Uploading Image",
        description : error == 'title' ? 'Image Title Required' : '',
        duration: 5000,
        className: "success-toast",
      });
    }


  }

  return (
    <Stack>
      <Stack pb={5}>
        <Text fontSize={"27.5px"}>{configs.name}</Text>
        <Text>{configs.description}</Text>
      </Stack>

      <Stack py={3}>
        <Label htmlFor="image">Image Title</Label>
        <Input
          type="text"
          id="image"
          value={imageState.title!}
          onChange={(e) => {
            dispatch(setImage({ ...imageState, title: e.target.value }));
          }}
        />
        {error && <Text fontSize={'12px'} color={'tomato'}>{error}</Text>}
      </Stack>
      <Stack py={4}>
        {configs.type == "fill" && (
          <>
            <Label>Aspect Ratio</Label>
            <Select
              onValueChange={(value) => {
                dispatch(setImage({ ...imageState, aspect_ratio: value }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a size" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="4:3">4:3</SelectItem>
                  <SelectItem value="16:9">16:9</SelectItem>
                  <SelectItem value="9:16">9:16</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </>
        )}

        {configs.type == "prompt" && (
          <>
            <Label htmlFor="Prompt">{configs.label}</Label>
            <Input
              type="text"
              id="Prompt"
              name="prompt"
              value={imageState.Prompt!}
              onChange={(e) => {
                dispatch(setImage({ ...imageState, Prompt: e.target.value }));
              }}
            />
          </>
        )}

        {configs.type == "recolor" && (
          <Stack direction={"row"}>
            <Input
              type="text"
              id="obj"
              placeholder="object to recolor"
              value={imageState.object_recolor!}
              onChange={(e) => {
                dispatch(
                  setImage({ ...imageState, object_recolor: e.target.value })
                );
              }}
            />
            <Input
              type="text"
              id="color"
              placeholder="color"
              value={imageState.color!}
              onChange={(e) => {
                dispatch(setImage({ ...imageState, color: e.target.value }));
              }}
            />
          </Stack>
        )}
      </Stack>

      <Flex
        wrap={"wrap"}
        gap={"40px"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
      >
        <MediaUploader
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        <Transformed_Image
          isTransforming={transforming_img}
          selectedImage
          myImage
        />
      </Flex>
      <Stack pb={10} pt={5} gap={6}>
        {!transforming_img ? (
          <Button
            disabled={selectedImage.image ? false : true}
            onClick={onSubmit}
          >
            Apply Transformation
          </Button>
        ) : (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Generating
          </Button>
        )}

        {saving_img ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Saving
          </Button>
        ) : (
          <Button 
          onClick={saveimagetoDB}
          disabled={imageState.transformation_url ? false : true}
          >Save Image</Button>
        )}
      </Stack>
    </Stack>
  );
};
