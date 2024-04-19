"use client";
import { Flex,Text} from "@chakra-ui/react";
import Header from "@/components/shared/header";
import Edits from "@/components/shared/comm_edits";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { createUser } from "@/lib/actions/userActions";
import { CreateUser } from "@/types/types";
import {
  Image,
  Aperture,
  Sparkles,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useWidth } from "@/lib/widthCheck";
import { useAppSelector, useAppDispatch } from "./hooks";
import { setUser } from "@/store/slices/userSlice";
import { CommitIcon } from "@radix-ui/react-icons";
import { getAllImages } from "@/lib/actions/imageActions";

const Page = () => {
  const dispatch = useAppDispatch();
  const { isSignedIn, user } = useUser();
  const w = useWidth();
  const curr_user = useAppSelector((state) => { return state.userSlice});
  const curr_images = useAppSelector((state) => { return state.Images});
  let [ images , setImages ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ error , setError ] = useState('');

  useEffect(() => {
    async function createUser_if_Not_exist() {
      if (isSignedIn) {
        const obj: CreateUser = {
          username: user?.username,
          clerkId: user?.id,
          email: user?.emailAddresses[0].emailAddress,
          photo: user?.imageUrl,
          firstName: user?.firstName,
          lastName: user?.lastName,
          credits: null,
        };
        const newuser = await createUser(user.id, obj);
        if (newuser !== undefined && curr_user.clerkId !== newuser.clerkId) {
          console.log("called dispatch");
          dispatch(
            setUser({
              _id: newuser._id,
              clerkId: newuser.id,
              username: newuser.username,
              email: newuser.email,
              plan: newuser.planId,
              credits: newuser.creditBalance,
            })
          );
        }
      }
    }

    createUser_if_Not_exist();
  }, [isSignedIn, user]);
  useEffect(()=>{
    async function firstImage(){
      const getImages:any = await getAllImages(images.length);
      setImages(getImages)
      
    }
    firstImage();
  },[]);
  const icos = [
    {
      logo: <Image size={w ? "4vh" : "3vh"} />,
      text: "Restore",
      link: "/transformations/restore",
    },
    {
      logo: <Sparkles size={w ? "4vh" : "3vh"} />,
      text: "Fill",
      link: "/transformations/generative_fill",
    },
    {
      logo: <Aperture size={w ? "4vh" : "3vh"} />,
      text: "BgRemove",
      link: "/transformations/background_remove",
    },
    {
      logo: <SlidersHorizontal size={w ? "4vh" : "3vh"} />,
      text: "Recolor",
      link: "/transformations/recolor",
    },
  ];

  console.log(images)
  async function loadMoreImages() {
    setLoading(true);
    setError('');

    
    const getImages:any = await getAllImages(images.length);
    
      if(getImages){
        if(!images){
          setImages(getImages)
        }
        else{
          const newimages:any = images;
          for(let i = 0; i < getImages.length; i++){
            newimages.push(getImages[i]!);
          }
          setImages(newimages);
        }

       

      setLoading(false);
      }
      else{
        setError('Not Available')
        setLoading(false);
      } 


  }

  return (
    <>
      <Header />
      <Flex
        className="items-center justify-center mt-[-80px]"
        style={{ gap: !w ? "8px" : "20px" }}
      >
        {icos.map((i) => {
          return (
            <Link href={i.link}>
              <div className="loggos">
                <div className="logo_each">{i.logo}</div>
                <p style={{ fontSize: "11px", color: "white" }}>{i.text}</p>
              </div>
            </Link>
          );
        })}
      </Flex>
      <Edits images={images} />
      <div className="flex items-center justify-center py-[20px]">
        {loading ? (
          <>
            <CommitIcon className="mr-2 h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
          <ChevronDown
            className="DOWN_ARROW animate-pulse opacity-75"
            onClick={loadMoreImages}
            />
            {error && <Text color='tomato' size={'sm'} >{error}</Text>}
           </>
        )}
      </div>
    </>
  );
};

export default Page;
