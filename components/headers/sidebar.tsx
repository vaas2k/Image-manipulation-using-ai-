"use client";
import { Flex, Box } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Home,
  Image,
  Aperture,
  Star,
  Sparkles,
  UserRound,
  Coins,
  SlidersHorizontal,
} from "lucide-react";
import { Scan } from "lucide-react";
import b from "./bar.module.css";
import Link from "next/link";

const Sidebar = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [toggle , setToggle ] = useState('Home');

  useEffect(() => {
    function chngWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", chngWidth);
    return () => window.removeEventListener("resize", chngWidth);
  }, []);
  return (
    <>
      {width > 765 && (
        <Flex
          style={{ paddingTop: "50px", height: "100%", gap: "100px" }}
          p={5}
          direction={"column"}
          width={"300px"}
        >
          <Flex gap={4} pl={5} direction={"column"} alignItems={"flex-start"}>
            <Link href={'/home'}>
            <div className={toggle === 'Home' ? b.side_bar_button_clicked : b.side_bar_button} 
            onClick= {()=>{setToggle('Home')}}
            >
              <Home />
              Home
            </div>
              
              </Link>
             <Link href={'/restore'}>
            <div className={toggle === 'Restore' ? b.side_bar_button_clicked : b.side_bar_button} 
            onClick= {()=>{setToggle('Restore')}}
            >
              <Image />
              Image Restore
            </div>
            </Link>

            <Link href={'/image_fill'}>  
            <div className={toggle === 'Fill' ? b.side_bar_button_clicked : b.side_bar_button} 
            onClick= {()=>{setToggle('Fill')}}
            >
              <Sparkles />
              Generative Fill
            </div>
            </Link>


            <Link href='/object_remove'>
            <div className={toggle === 'O-remove' ? b.side_bar_button_clicked : b.side_bar_button} 
            onClick= {()=>{setToggle('O-remove')}}
            >
              <Scan />
              Object Remove
            </div>
            </Link>


            <Link href={'/recolor'}>
            <div className={toggle === 'recolor' ? b.side_bar_button_clicked : b.side_bar_button} 
            onClick= {()=>{setToggle('recolor')}}
            >
              <SlidersHorizontal />
              Object Recolor
            </div>
            </Link>


            <Link href={'/background_remove'}>
            <div className={toggle === 'remove' ? b.side_bar_button_clicked : b.side_bar_button} 
            onClick= {()=>{setToggle('remove')}}
            >
              <Aperture />
              Background Remove
            </div>
            </Link>

          </Flex>
          <Flex direction={"column"} gap={6} pl={5} alignItems={"flex-start"}>
          
          <Link href='/profile'>
          <div className={toggle === 'profile' ? b.side_bar_button_clicked : b.side_bar_button} 
            onClick= {()=>{setToggle('profile')}}
            >
              <UserRound />
              Profile
            </div>
          </Link>

          <Link href={'/credits'}>
            <div className={toggle === 'credits' ? b.side_bar_button_clicked : b.side_bar_button} 
            onClick= {()=>{setToggle('credits')}}
            >
              <Coins />
              Buy Credits
            </div>
          </Link>
          </Flex>
        </Flex>

      )}

    </>
  );
};

export default Sidebar;
