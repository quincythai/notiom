import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Flex flexDirection="column" textAlign="center" gap={10}>
      <Heading as="h1">Create. Explore.</Heading>
      <Text fontSize={30}>
        The document editing software you've been waiting for
      </Text>
    </Flex>
  );
};

export default Header;