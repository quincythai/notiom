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
  Text,
} from "@chakra-ui/react";

// Question mark means make the text prop optional i.e. put lorem default
interface CardProps {
  _id: string; //MongoDB's _id is a string not a number\
  text: string;
  onUpdate: (_id: string, newTest: string) => void;
  onDelete: (_id: string) => void;
}

const Card: React.FC<CardProps> = ({ text, _id, onUpdate, onDelete }) => {
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
              onChange={(e) => setEditedText(e.target.value)}
            ></Textarea>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onUpdate(_id, editedText);
                onClose();
              }}
            >
              Confirm edit
            </Button>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                console.log(_id);
                onDelete(_id);
                onClose();
              }}
            >
              Delete card
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Card;
