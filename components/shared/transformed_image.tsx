"use client";

import { Flex,Stack, Text,Image } from "@chakra-ui/react";
import up from "./comp.module.css";
import { useState } from "react";
import { useWidth } from "../../lib/widthCheck";
import { Download } from "lucide-react";
import { useAppSelector } from "@/app/hooks";
import { ReloadIcon } from "@radix-ui/react-icons";



export const Transformed_Image = ( {isTransforming,selectedImage} : any ) => {
  const w = useWidth()
  const [hasDownload ,setDownload] = useState(true);
  const imageState = useAppSelector((state)=>{ return state.imageSlice});


  const whatToRender = () => {

    if(imageState.transformation_url){
      return (<div className="cursor-pointer overflow-hidden rounded-[10px]">
      <Image
        width= {w ? "370px" : "250px"}
        height='auto'
        src={imageState.transformation_url}
        sizes="100vw"
      />
    </div>)
    }
    else if(isTransforming){
      return (<div className={up.Div1}  style={{
        width: w ? "370px" : "250px",
        height: "240px",
      }}>
        <ReloadIcon className=" h-[20px] w-[20px] animate-spin" />
    </div>)
    }
    else{
      return(<div
        className={up.Div1}
        style={{
          width: w ? "370px" : "235px",
          height: w ? "240" : "220px",
        }}
      >
        <Text fontSize={"11px"} pb={5}>
          Transformed Image
        </Text>
      </div>)
    }
  }
  

  return (
    <>
      <Flex wrap="wrap">
        <Stack>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text pb={5}> Transformation </Text>
            {hasDownload && <Download />}
            </Flex>
            {whatToRender()}
        </Stack>
      </Flex>
    </>
  );
};
