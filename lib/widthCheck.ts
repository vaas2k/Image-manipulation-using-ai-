import { useMediaQuery } from "@chakra-ui/react";

export const useWidth = () => {
  const [w] = useMediaQuery('(min-width: 765px)');
  return w;
  }