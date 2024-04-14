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
import { useState, useEffect } from "react";
import { MediaUploader } from "./mediaUploader";
import { Transformed_Image } from "./transformed_image";
import { Button } from "../ui/button";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setImage } from "@/store/slices/imageSlice";
import { useToast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons"
import { setUser } from "@/store/slices/userSlice";



export const ImageForm = ({ configs }: any) => {

  const { toast } = useToast();
  const [aspectRatio, setAspectRatio] = useState<string>("");
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState<any>({
    image: '',
    width: '',
    height: '',
    publicId:''
  });
  const [transforming_img, setTransforming_img] = useState<boolean>(false);
  const imageState = useAppSelector((state) => { return state.imageSlice });
  const cur_user = useAppSelector((state) => { return state.userSlice });



  async function onSubmit() {
    setTransforming_img(true);
    
    if(imageState.transformation_url){
      dispatch(setImage({
        ...imageState,
        transformation_url :"",
        width : "",
        height : "",
      }))
    }

    setTimeout(()=>{
      dispatch(setImage({
        ...imageState,
        transformation_url :selectedImage.image,
        width : selectedImage.width,
        height : selectedImage.height,
      }))
      setTransforming_img(false);

      dispatch(setUser({
        ...cur_user,
        credits : cur_user.credits - 1
      }))
      toast({
        title: "Image Transformation Done",
        description: "1 credit was deducted from your account",
        duration: 5000,
        className: "success-toast",
      });
    },3000)


    
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
          value={imageState.title}
          onChange={(e) => {
            dispatch(setImage({ ...imageState, title: e.target.value }));
          }}
        />
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
              value={imageState.Prompt}
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
              value={imageState.object_recolor}
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
              value={imageState.color}
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
        {!transforming_img ? (<Button
          disabled={selectedImage.image ? false : true}
          onClick={onSubmit}
        >
          Apply Transformation
        </Button>)
        :
        (<Button disabled>
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Generating
        </Button>)
        }
        <Button>Save Image</Button>
      </Stack>

    </Stack>
  );
};
