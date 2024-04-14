"use client";
import { Button } from "@/components/ui/button";
import { Flex, Text, Box } from "@chakra-ui/react";
import Header from "@/components/shared/header";
import Edits from "@/components/shared/comm_edits";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createUser, getUserById } from "@/lib/actions/userActions";
import { CreateUser } from "@/types/types";
import { Image, Aperture, Sparkles, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useWidth } from "@/lib/widthCheck";
import { useAppSelector,useAppDispatch } from "./hooks";
import { setUser } from "@/store/slices/userSlice";

const Page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isSignedIn, isLoaded, user } = useUser();
  const w = useWidth();
  const curr_user = useAppSelector((state) => {
    return state.userSlice;
  });

  useEffect(() => {
    async function createUser_if_Not_exist(){

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
        if(newuser !== undefined && curr_user.clerkId !== newuser.clerkId){
          console.log('called dispatch') 
          dispatch(setUser({
            clerkId : newuser.id,
            username : newuser.username,
            email : newuser.email,
            plan : newuser.planId,
            credits : newuser.creditBalance
          }))        
        }
      }
    }

    createUser_if_Not_exist();
  }, [isSignedIn, user]);

  try {
    if (isSignedIn) {
      router.push("/home");
    } else {
      router.push("/");
    }
  } catch (error) {
    console.error("Error during navigation:", error);
  }
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

  return (
    <>
      {!isSignedIn && (
        <Flex
          pt={8}
          px={4}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box>
            <Text>Logo</Text>
          </Box>
          <Box>
            <>
              <Button style={{ marginRight: "10px" }}>
                {" "}
                <SignInButton />{" "}
              </Button>
              <Button>
                {" "}
                <SignUpButton />{" "}
              </Button>
            </>
          </Box>
        </Flex>
      )}
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
      <Edits />
    </>
  );
};

export default Page;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
