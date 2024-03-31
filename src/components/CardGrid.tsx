import React, { useState } from "react";
import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import Card from "./Card";
import HeaderCard from "./HeaderCard";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Button,
} from "@chakra-ui/react";

const CardGrid = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint quod unde iure. Maxime nisi velit fugiat voluptate, aperiam magnam commodi culpa? Magni, praesentium doloribus perspiciatis sequi quasi labore molestiae quos!",
    },
  ]);

  const [value, setValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const addNewCard = () => {
    const newCard = {
      id: cards.length + 1,
      text: value,
    };
    setCards([...cards, newCard]);
    setValue("");
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const updateCardText = (id: number, newText: string) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, text: newText } : card))
    );
  };

  return (
    <>
      <Grid
        templateColumns="repeat(6, 140px)"
        gap={6}
        margin={8}
        justifyContent="center"
      >
        <GridItem width="140px" height="140px" onClick={onOpen}>
          <HeaderCard />
        </GridItem>
        {cards.map((card) => (
          <GridItem key={card.id} width="140px" height="140px">
            <Card id={card.id} text={card.text} onUpdate={updateCardText} />
          </GridItem>
        ))}
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Enter card text..."
              value={value}
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
                addNewCard();
                onClose();
              }}
            >
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CardGrid;
