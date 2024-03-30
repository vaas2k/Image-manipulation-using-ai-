"use client";
import { useState, useEffect } from "react";
import { ReactElement } from "react";
import { Button } from "../ui/button";
import { Container, Flex, Box, Text, Stack,Divider } from "@chakra-ui/react";
import { SignOutButton } from "@clerk/nextjs";
import {
  Input,
  InputGroup,
  InputAddon,
  InputRightElement,
} from "@chakra-ui/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";

const Navbar = (): ReactElement => {

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function chngWidth() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", chngWidth);
    return () => window.removeEventListener("resize", chngWidth);
  }, []);

  return (
    <>
      {width < 765 && (
        <Flex p={5} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Text>Logo</Text>
          </Box>
          <InputGroup width={"170px"}>
            <Input type="text" placeholder="search" />
            <InputRightElement>
              <Search />
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
      {width > 765 ? (
        <Flex justifyContent={"space-between"} alignItems={"center"} pt={8}>
          <Box pl={12}>
            <Text>Logo</Text>
          </Box>

          <Flex pr={12} gap={5}>
            <Button> <Link href='/'><SignOutButton/></Link>  </Button>
          </Flex>
        </Flex>
      ) : (
        <Sheet>
          <Flex style={{ marginTop: "250px", opacity: "80%" }}>
            <SheetTrigger>
              <ChevronRight />
            </SheetTrigger>
          </Flex>
          <SheetContent side={"left"}>
            <SheetHeader className="pb-10"> 
              <SheetTitle>Logo</SheetTitle>
            </SheetHeader>
            <Flex direction={'column'} gap={20}>
              <Stack gap={5}>
              <Button>Option1</Button>
                <Button>Option2</Button>
              </Stack>
              <Stack direction={"column"} >
              {<><Button>Sign In</Button>
            <Button>Sign Up</Button> </>}
            <Button>Logout </Button>
              </Stack>
            </Flex>
          </SheetContent>
        </Sheet>
      )}
      
    </>
  );
};

export default Navbar;
