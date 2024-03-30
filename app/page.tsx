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
import {useState,useEffect} from 'react'
import { useAppDispatch } from "./hooks";
import { useRouter } from "next/navigation";


const Home = () => {

  const router = useRouter();
  const { isSignedIn, isLoaded, user } = useUser();

  if(isSignedIn){
    router.push('/home');
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
