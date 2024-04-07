"use client";
import Subscription_Card from "@/components/shared/subcr_banner";
import { Container, Stack, Text } from "@chakra-ui/react";
import { plans } from "@/constants/constants";
import { useState, useEffect } from "react";
import { useWidth } from "@/lib/widthCheck";

const Credits = () => {
  

  const w = useWidth();
  const [plan , setPlan] = useState<number | null >(null)
  useEffect(()=>{
    const userString = window.sessionStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    setPlan(user.planId);
  },[]);

  return (
    <Container
      maxW={!w  ? "50%" : "85%"}
      className={!w  ? "flex items-center justify-center" : ""}
    >
      {!w  &&<Text fontSize="27.5px" >Buy Credits</Text> }
      <Stack gap={!w  ? 8 : 4} direction={!w  ? "column" : "row"}>
      {!w  &&<Text fontSize="27.5px" >Buy Credits</Text> }
        {plans.map((i) => {
          return (
            <Subscription_Card
              id={i._id}
              name={i.name}
              price={i.price}
              credits={i.credits}
              inclusions={i.inclusions}
              plan={plan}
            />
          );
        })}
      </Stack>
    </Container>
  );
};

export default Credits;
