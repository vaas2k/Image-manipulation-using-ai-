import { SignIn } from "@clerk/nextjs";
import { Container } from "@chakra-ui/react";

export default function Page() {
  return (
    <div
      className="flex justify-center items-center"
      style={{ marginTop: "100px" }}
    >
      <SignIn />
    </div>
  );
}
