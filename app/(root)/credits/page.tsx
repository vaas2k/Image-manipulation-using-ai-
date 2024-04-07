"use client";
import Subscription_Card from "@/components/shared/subcr_banner";
import { Container, Stack, Text } from "@chakra-ui/react";
import { plans } from "@/constants/constants";
import { useState, useEffect } from "react";

const Credits = () => {
  

  const [plan , setPlan] = useState<number | null >(null);
  const [w, setWidth] = useState(window.innerWidth);
  useEffect(() => {
      
      const userString = window.sessionStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      setPlan(user.planId);
    
      function chngWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", chngWidth);
    return () => window.removeEventListener("resize", chngWidth);
  
  }, []);


  return (
    <Container
      maxW={w < 765 ? "50%" : "85%"}
      className={w < 765 ? "flex items-center justify-center" : ""}
    >
      {w > 765 &&<Text fontSize="27.5px" >Buy Credits</Text> }
      <Stack gap={w < 765 ? 8 : 4} direction={w < 765 ? "column" : "row"}>
      {w < 765 &&<Text fontSize="27.5px" >Buy Credits</Text> }
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
