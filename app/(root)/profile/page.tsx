'use client'
import { useWidth } from "@/lib/widthCheck";
import { Container, Stack, Text, HStack, Flex, Image, Link } from "@chakra-ui/react";
import { Coins, Image as LucidityImage } from "lucide-react";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/app/hooks";
import { getUserImages } from "@/lib/actions/imageActions";

const Profile = () => {
  const w = useWidth();
  const [userImages, setUserImages] = useState<any[]>([]);
  const user = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    async function getImages() {
      const images = await getUserImages(user._id!);
      setUserImages(images!);
    }
    getImages();
  }, []);

  return (
    <Container maxW="8xl" className="flex flex-col mx-auto px-4 py-8">
      <Text pb={5} fontSize="3xl" className="text-center font-bold">
        Profile
      </Text>
      <Stack direction={w ? "row" : "column"} spacing={8} className="flex items-center justify-between">
      <div className="flex flex-col gap-4 items-center justify-center rounded-lg bg-gray-100 shadow-md px-6 py-8 w-full md:w-2/4">
          <Text className="text-xl font-semibold">Credits</Text>
          <HStack spacing={2}>
            <Coins size={24} />
            <p className="text-lg font-medium">{user.credits}</p>
          </HStack>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center rounded-lg bg-gray-100 shadow-md px-6 py-8 w-full md:w-2/4">
          <Text className="text-xl font-semibold">Image Manipulations</Text>
          <HStack spacing={2}>
            <LucidityImage size={24} />
            <p className="text-lg font-medium">6</p>
          </HStack>
        </div>
      </Stack>

      <Text py={8} fontSize="2xl" className="text-center font-semibold">
        Recent Edits
      </Text>
      <Container maxW="90%">
        <Flex flexWrap="wrap" justify="center" gap={6}>
          {userImages.map((i) => (
            <Link key={i.id} href={i.transformation_url} isExternal // Add link and isExternal prop to Link component
              className="group relative rounded-lg overflow-hidden shadow-md w-64 h-64 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2"
            >
              <Image
                src={i.transformation_url}
                alt={i.title} // Add alt text for accessibility
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300 ease-in-out"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition duration-300 ease-in-out">
                <Text className="absolute bottom-2 left-2 text-white font-medium truncate">{i.title}</Text>
              </div>
            </Link>
          ))}
        </Flex>
      </Container>
    </Container>
  );
};

export default Profile;
