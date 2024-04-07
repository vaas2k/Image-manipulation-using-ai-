"use client";
import b from "./bar.module.css";
import { useState, useEffect } from "react";
import { ReactElement } from "react";
import { Button } from "../ui/button";
import { Flex, Box, Text, Stack, Divider } from "@chakra-ui/react";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Sheet,SheetContent,SheetHeader,SheetTitle,SheetTrigger,} from "@/components/ui/sheet";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlignLeft } from "lucide-react";
import { LogOut} from "lucide-react";
import { sidelinks } from "./sidebar";
import { resetUser } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/app/hooks";
import { useWidth } from "@/lib/widthCheck";

const Navbar = (): ReactElement => {
  const router = useRouter();
  const [toggle , setToggle ] = useState('Home');
  const w = useWidth();

  const dispatch = useAppDispatch();

  function handleReset(){
    dispatch(resetUser());
    router.push("/");
  }

  return (
    <>
      {w ? (
        <Flex justifyContent={"space-between"} alignItems={"center"} pt={8}>
          <Box pl={12}>
            <Text>Logo</Text>
          </Box>

          <Flex pr={12} gap={5}>
              <UserButton />
          </Flex>
        </Flex>
      ) : (
        <Sheet>
          {!w && (
            <Flex p={5} alignItems={"center"} justifyContent={"space-between"}>
              <Flex style={{ opacity: "80%" }}>
                <SheetTrigger>
                  <AlignLeft size={"20px"} />
                </SheetTrigger>
              </Flex>
              <Box>
                <Text>Logo</Text>
              </Box>

              <UserButton />
            </Flex>
          )}
          <SheetContent side={"left"}>
            <SheetHeader className="pb-10">
              <SheetTitle>Logo</SheetTitle>
            </SheetHeader>
            <Flex direction={"column"} gap={20}>
              <Stack gap={5}>
                {sidelinks.map((i) => {
                  return (
                    <Link href={i.link}>
                      <div
                        className={
                          toggle === i.type
                            ? b.side_bar_button_clicked
                            : b.side_bar_button
                        }
                        onClick={() => {
                          setToggle(i.type);
                        }}
                      >
                        {i.logo}
                        <p style={{ marginTop: "2.5px", marginLeft: "8px" }}>
                          {i.name}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </Stack>
              <Stack direction={"column"}>
                <div
                  className={
                    toggle === "out"
                      ? b.side_bar_button_clicked
                      : b.side_bar_button
                  }
                  onClick={() => {
                    setToggle("out");
                  }}
                >
                  <LogOut />
                  <p style={{ marginTop: "2.5px", marginLeft: "8px" }}>
                    <SignOutButton />
                  </p>
                </div>
              </Stack>
            </Flex>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default Navbar;
