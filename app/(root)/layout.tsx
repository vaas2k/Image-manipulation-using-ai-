'use client'
import { Grid, GridItem } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Navbar from "@/components/headers/navbar";
import Sidebar from "@/components/headers/sidebar";
import { useUser } from "@clerk/nextjs";

const Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  
    const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function chngWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", chngWidth);
    return () => window.removeEventListener("resize", chngWidth);
  }, []);

  const isSigned = useUser();

  return (
    <Grid
      templateAreas={
        width > 765
          ? `"header header"
       "nav main"
       "nav footer"`
          : `"header header"
        "main main"
        "nav footer"`
      }
      gridTemplateRows={"50px 1fr 30px"}
      gridTemplateColumns={"150px 1fr"}
      h="200px"
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
        mt={width > 765 ? 5 : 0}
        pl="4"
        style={{
          paddingTop: "30px",
          overflow: "auto",
          height: "600px",
        }}
        area={"main"}
      >
        {children}
      </GridItem>
    </Grid>
  );
};

export default Layout;