import React from "react";
import { Flex, Image, Heading, Button, Center } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <nav>
      <Flex padding={12} justifyContent="space-between" alignItems="center">
        <Flex gap={4}>
          <Image alt="Notiom logo" src="notiom.svg" />
          <Heading>Notiom</Heading>
        </Flex>
        <Button color="white" fontSize={20} padding={6}>
          Create
        </Button>
      </Flex>
    </nav>
  );
};

export default Navbar;
