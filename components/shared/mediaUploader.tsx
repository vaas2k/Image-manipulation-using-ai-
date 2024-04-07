"use client";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Text, Flex, Stack, Image } from "@chakra-ui/react";
import { useState } from "react";
import up from "./comp.module.css";
import { useWidth } from "../../lib/widthCheck";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setImage } from "@/store/slices/imageSlice";

interface MediaUploaderProps {
  onValueChange?: (value: string) => void; // Optional callback function
}

export const MediaUploader = ({selectedImage,setSelectedImage} : any ) => {
  const w = useWidth();
  const [file, setFile] = useState<any>();
  const dispatch = useAppDispatch();
  const currentImageState = useAppSelector((state) => {
    return state.imageSlice;
  });

  const { toast } = useToast();

  function handleSucess(result:any) {
    setSelectedImage({
      image: result?.info?.secure_url,
      width: result?.info?.width,
      height: result?.info?.height,
    });
    toast({
      title: "Image uploaded successfully",
      description: "1 credit was deducted from your account",
      duration: 5000,
      className: "success-toast",
    });
  }

  return (
    <>
      <CldUploadWidget
        uploadPreset="vo3syvug"
        options={{
          multiple: false,
          resourceType: "image",
        }}
        onSuccess={handleSucess}
      >
        {({ open }) => {
          return (
            <Flex>
              {!selectedImage.image ? (
                <Stack>
                  <Text pb={5}>Original</Text>
                  <div
                    className={up.Div1}
                    style={{
                      width: w ? "370px" : "250px",
                      height: "240px",
                    }}
                    onClick={() => {
                      open();
                    }}
                  >
                    <Plus />
                    <Text fontSize={"11px"}>Add Image</Text>
                  </div>
                </Stack>
              ) : (
                <Stack>
                  <Text pb={5}>Original</Text>
                  <div className="cursor-pointer overflow-hidden rounded-[10px]">
                <CldImage 
                  width={w ? 370 : 250}
                  height={selectedImage.height}
                  src={selectedImage.image}
                  alt="image"
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  onClick={()=>{open();}}
                />
              </div>
                </Stack>
              )}
            </Flex>
          );
        }}
      </CldUploadWidget>
    </>
  );
};
