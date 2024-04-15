"use client";
import { Flex, Box } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Home,
  Image,
  Aperture,
  Sparkles,
  UserRound,
  Coins,
  SlidersHorizontal,
  Scan
} from "lucide-react";
import b from "./bar.module.css";
import Link from "next/link";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { useWidth } from "@/lib/widthCheck";
import { useUser } from "@clerk/nextjs";
import { ReloadIcon } from "@radix-ui/react-icons";

const Sidebar = () => {
  const {isSignedIn,isLoaded,user} = useUser();
  const w = useWidth();
  const [toggle, setToggle] = useState<any>("");
  let prolinks = [
    {
      link: "/profile",
      name: "Profile",
      description: "Profile",
      type: "Profile",
      logo: <UserRound />,
    },
    {
      link: "/credits",
      name: "Buy Credits",
      description: "Credits",
      type: "Credits",
      logo: <Coins />,
    },
  ];
  let loginLinks = [
    {
      link: "/sign-in",
      name: "Signin",
      description: "login to your account",
      type: "Signin",
    },
    {
      link: "/sign-up",
      name: "Signup",
      description: "register your account",
      type: "Signup",
    },
  ];

  const renderSiderBar = () => {
    if(isLoaded && isSignedIn ){
      return(
        <>
          <Flex gap={4} pl={5} direction={"column"} alignItems={"flex-start"}>
          {sidelinks.map((i)=>{
            return(
              <Link href={i.link} key={1}>
              <div
                className={
                  toggle === i.type
                  ? b.side_bar_button_clicked
                  : b.side_bar_button
                }
                onClick={() => {
                  setToggle(i.type);
                }}
                >
                {i.logo}
                <p style={{ marginTop: "2.5px", marginLeft: "8px" }}>
                  {i.name}
                </p>
              </div>
            </Link>
              )
            })}
          </Flex>
          <Flex direction={"column"} gap={6} pl={5} alignItems={"flex-start"}>
            {prolinks.map((i)=>{
              return(
                <Link href={i.link} key={1}>
              <div
                className={
                  toggle === i.type
                  ? b.side_bar_button_clicked
                  : b.side_bar_button
                }
                onClick={() => {
                  setToggle(i.type);
                }}
                >
                {i.logo}
                <p style={{ marginTop: "2.5px", marginLeft: "8px" }}>
                  {i.name}
                </p>
              </div>
            </Link>
              )
            })}
          </Flex>
          </>
      )
    }
    else if(!isLoaded && !isSignedIn){
      return(
        <>
         <Flex direction={"column"} gap={6} pl={5} alignItems={"flex-start"}>
         <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
           {" "}           
          </Flex>
         </> 
      )
    }
    else if(!isSignedIn){
      return(
        <>
       <Flex direction={"column"} gap={6} pl={5} alignItems={"flex-start"}>
          {loginLinks.map((i)=>{
            return(
              <Link href={i.link} key={1}>
                <Button className="w-[180px]">
                   {i.name}
                  </Button>            
          </Link>
            )
          })}
        </Flex>
       </> 
    )
  }
  }
  
  return (
    <>
      {w && (
        <Flex
          style={{ paddingTop: "50px", height: "100%", gap: "100px" }}
          p={5}
          direction={"column"}
          width={"300px"}
        >
          {renderSiderBar()}
        </Flex>
      )}
    </>
  );
};

export const sidelinks = [
  {
    link: "/",
    name: "Home",
    description: "Home",
    type: "home",
    logo: <Home />,
  },
  {
    link: "/transformations/restore",
    name: "Restore",
    description: "Restore",
    type: "restore",
    logo: <Image />,
  },
  {
    link: "/transformations/generative_fill",
    name: "Generative fill",
    description: "Generative_fill",
    type: "Generative_fill",
    logo: <Sparkles />,
  },
  {
    link: "/transformations/object_remove",
    name: "Object Remove",
    description: "Object Remove",
    type: "Object Remove",
    logo: <Scan />,
  },
  {
    link: "/transformations/recolor",
    name: "Object Recolor",
    description: "Object Recolor",
    type: "Object Recolor",
    logo: <SlidersHorizontal />,
  },
  {
    link: "/transformations/background_remove",
    name: "Background Remove",
    description: "Background Remove",
    type: "Background Remove",
    logo: <Aperture />,
  },
];


export default Sidebar;
