import React from "react";
import { Image } from "@chakra-ui/react";

const HeaderCard = () => {
  return (
    <Image
      alt="create doc"
      src="create-doc.svg"
      borderRadius={8}
      boxSize="100%"
      objectFit="cover"
      cursor="pointer"
      transition="0.2s ease-in-out"
      _hover={{
        transform: "scale(1.03)",
        shadow: "xl",
      }}
    ></Image>
  );
};

export default HeaderCard;
