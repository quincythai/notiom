import React, { useEffect, useState } from "react";
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
  const [cards, setCards] = useState([]);
  const [value, setValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch cards from Mongodb
  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch('/api/getDocs');
      const data = await response.json();
      setCards(data)
    };

    fetchCards().catch(console.error)
  }, [])

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  // const addNewCard = async () => {
  //   const newCard = {
  //     text: value,
  //     createdAt: new Date().toISOString(), // Add a createdAt field
  //   };

  //   // Send the new card to the backend
  //   const response = await fetch('/api/createDoc', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newCard),
  //   });

  //   const createdCard = await response.json(); // The response from the backend should include the new card with an _id
  //   setCards([...cards, createdCard]);
  //   setValue("");
  // };

  // const updateCardText = async (id, newText) => {
  //   // Implement a call to the backend to update the card text
  //   // For now, this is just updating the state, which won't persist
  //   setCards(cards.map((card) => (card.id === id ? { ...card, text: newText } : card)));
  // };


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
