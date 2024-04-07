"use client";
import { useWidth } from "@/lib/widthCheck";
import { Container, Stack, Text, Box, HStack, Flex } from "@chakra-ui/react";
import { Coins, Image } from "lucide-react";
import { UserProfile } from "@clerk/nextjs";
import { useState,useEffect } from "react";

const Profile = () => {
  const w = useWidth();

  const [credits, setCredits] = useState();
  useEffect(()=>{
      const userString = window.sessionStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      setCredits(user.creditBalance);
    },[]);

  return (
    <Container maxW={"85%"}>
      <Text pb={5} fontSize={"30px"}>
        {" "}
        Profile{" "}
      </Text>
      <Container className="items-center justify-center" maxW={"90%"}>
        <Stack
          direction={w ? "row" : "column"}
          className="flex items-center justify-between"
        >
          <div
            className="flex gap-[20px] items-start justify-center flex-col border-2 p-[20px] rounded-lg"
            style={{ width: !w ? "250px" : "380px" }}
          >
            <Text>Credits</Text>
            <HStack>
              {" "}
              <Coins /> <p>{credits}</p>
            </HStack>
          </div>

          <div
            className="flex gap-[20px] items-start justify-center flex-col border-2 p-[20px] rounded-lg"
            style={{ width: !w ? "250px" : "380px" }}
          >
            <Text>Image Manipulations</Text>
            <HStack>
              {" "}
              <Image /> <p>6</p>
            </HStack>
          </div>
        </Stack>
      </Container>

      <Text py={8} fontSize={"25px"}>
        Recent Edits
      </Text>
      <Container maxW={"90%"}>
        <Flex
          flexWrap={"wrap"}
          gap={"60px"}
          className="flex items-center justify-center"
        >
          <div className="border-2 w-[200px] h-[200px] md:w-[220px] md:h-[220px] lg:w-[250px] lg:h-[240px] rounded-lg">
            <Text>Image</Text>
          </div>
          <div className="border-2 w-[200px] h-[200px] md:w-[220px] md:h-[220px] lg:w-[250px] lg:h-[240px] rounded-lg">
            <Text>Image</Text>
          </div>
          <div className="border-2 w-[200px] h-[200px] md:w-[220px] md:h-[220px] lg:w-[250px] lg:h-[240px] rounded-lg">
            <Text>Image</Text>
          </div>
        </Flex>
      </Container>
    </Container>
  );
};

export default Profile;
