"use client";
import { Button } from "@/components/ui/button";
import { Flex, Text, Box } from "@chakra-ui/react";
import Header from "@/components/shared/header";
import Edits from "@/components/shared/comm_edits";
import {
  SignInButton,
  SignUpButton,
  useUser,useAuth
} from "@clerk/nextjs";
import {useState,useEffect,useMemo, use} from 'react'
import { useAppDispatch, useAppSelector } from "./hooks";
import { useRouter } from "next/navigation";
import { setUser } from "@/store/slices/userSlice";
import { createUser } from "@/lib/actions/userActions";
import { CreateUser } from "@/types/types";


const Home = () => {

  const router = useRouter();
  const { isSignedIn,isLoaded, user } = useUser();
  

  if(isSignedIn){
    router.push('/home');
    const obj: CreateUser = {
      username: user?.username,
      clerkId: user?.id,
      email: user?.emailAddresses[0].emailAddress,
      photo: user?.imageUrl,
      firstName : user?.firstName,
      lastName : user?.lastName,
      credits : null
    };
    createUser(user.id,obj);
    
  }else{
    router.push('/');
  }

  return (
  <>
      { !isSignedIn && 
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
                  <SignInButton/>{" "}
                </Button>
                <Button>
                  {" "}
                  <SignUpButton />{" "}
                </Button>
              </>
          </Box>
        </Flex>
      }
      <Header />
      <Edits />
    </>
  );
};

export default Home;
