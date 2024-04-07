"use client";

import { Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import up from "./comp.module.css";
import { useState, useEffect } from "react";
import { useWidth } from "../../lib/widthCheck";
import { TransformationImage } from "@/types/types";
import { Download } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Skeleton } from "@/components/ui/skeleton"



export const Transformed_Image = ( {isTransforming} : any ) => {
  const w = useWidth();
  const [hasDownload ,setDownload] = useState(true);
  const imageState = useAppSelector((state)=>{ return state.imageSlice});
  

  return (
    <>
      <Flex>
        <Stack>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Text pb={5}> Transformation </Text>
            {hasDownload && <Download />}
          </Flex>
          {isTransforming && (
            <div className="flex flex-col space-y-3">
              <Skeleton
                className="rounded-xl"
                style={{
                  width: w > 765 ? "370px" : "250px",
                  height: "80px",
                }}
              />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          )}
          {!imageState.transformation_url && !isTransforming ? (
            <div
              className={up.Div1}
              style={{
                width: w > 765 ? "370px" : "250px",
                height: "240px",
              }}
            >
              <Text fontSize={"11px"} pb={5}>
                Transformed Image
              </Text>
            </div>
          ) : (
            <div className="cursor-pointer overflow-hidden rounded-[10px]">
              <CldImage
                width={w > 765 ? 370 : 250}
                height={imageState.height}
                src={imageState.transformation_url}
                alt="image"
                sizes={"(max-width: 767px) 100vw, 50vw"}
              />
            </div>
          )}
        </Stack>
      </Flex>
    </>
  );
};
