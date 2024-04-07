"use client";
import { Grid, GridItem } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Navbar from "@/components/headers/navbar";
import Sidebar from "@/components/headers/sidebar";
import { useUser } from "@clerk/nextjs";
import { useWidth } from "@/lib/widthCheck";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const w = useWidth();

  const isSigned = useUser();

  return (
    <Grid
      templateAreas={
        w > 765
          ? `"header header"
       "nav main"
       "nav main"`
          : `"header header"
        "main main"
        "nav footer"`
      }
      gridTemplateRows={"50px 1fr 30px"}
      gridTemplateColumns={"150px 1fr"}
      h="100%"
      style={{ columnGap: "100px", rowGap: "20px" }}
      color="blackAlpha.700"
      fontWeight="bold"
    >
      <GridItem pl="2" area={"header"}>
        <Navbar />
      </GridItem>
      <GridItem pl="2" area={"nav"}>
        {isSigned && <Sidebar />}
      </GridItem>
      <GridItem
        pr="6"
        mt={w > 765 ? 5 : 0}
        pl="4"
        style={{
          paddingTop: "30px",
          overflow: "auto",
          height: w > 765 ? "650px" : "",
        }}
        area={"main"}
      >
        {children}
      </GridItem>
    </Grid>
  );
};

export default Layout;
