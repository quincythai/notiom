import React from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Textarea,
} from "@chakra-ui/react";

// Question mark means make the text prop optional i.e. put lorem default
interface CardProps {
  text: string;
  id: string; //MongoDB's _id is a string not a number
  onUpdate: (id: string, newTest: string) => void;
}

const Card: React.FC<CardProps> = ({ text, id, onUpdate }) => {
  const [editedText, setEditedText] = useState(text);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const trimText = (text: string, wordLimit: number): string => {
    const wordsArray = text.split(" ");
    if (wordsArray.length > wordLimit) {
      return wordsArray.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const trimmedText = trimText(text, 5);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  return (
    <>
      <Box
        border="1px"
        borderColor="gray"
        padding={4}
        borderRadius={8}
        width="100%"
        height="100%"
        onClick={onOpen}
        cursor="pointer"
        transition="0.2s ease-in-out"
        _hover={{
          transform: "scale(1.03)",
          shadow: "xl",
        }}
      >
        {trimmedText}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              value={editedText}
              onChange={handleInputChange}
            ></Textarea>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                onUpdate(id, editedText);
                onClose();
              }}
            >
              Confirm edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Card;
