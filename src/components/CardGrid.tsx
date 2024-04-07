import React, { useEffect, useState } from "react";
import {
  Center,
  Grid,
  GridItem,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
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

interface Card {
  id: string;
  text: string;
}

const CardGrid = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define fetchCards function outside of useEffect
  const fetchCards = async () => {
    setIsLoading(true);
    const response = await fetch("/api/getCards");
    const data = await response.json();
    setCards(data);
    setIsLoading(false);
  };

  // Fetch cards from MongoDB
  useEffect(() => {
    fetchCards().catch(console.error);
  }, []);

  const addCard = async () => {
    const newCard = {
      text: value, // value from the textbox variable
    };

    try {
      const response = await fetch("api/createCard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      });

      if (!response.ok) {
        throw new Error(`Failed to add new card: ${response.statusText}`);
      }

      setValue("");

      await fetchCards(); // Now fetchCards is accessible here
    } catch (error) {
      console.error(error);
    }
  };

  // have to specify /${id} to find specific one in mongodb database
  const deleteCard = async (id: string) => {
    try {
      const response = await fetch(`api/deleteCard/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete card: ${response.statusText}`);
      }
      await fetchCards(); // Refetch cards after deleting one
    } catch (error) {
      console.log(error);
    }
  };

  const updateCard = async (id, newText) => {
    // Implement a call to the backend to update the card text
    // For now, this is just updating the state, which won't persist
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
        {isLoading ? (
          <Center width="100%" height="100%">
            <Spinner size="xl" />
          </Center>
        ) : (
          cards.map((card) => (
            <GridItem key={card.id} width="140px" height="140px">
              <Card
                id={card.id}
                text={card.text}
                onUpdate={updateCard}
                onDelete={deleteCard}
              />
            </GridItem>
          ))
        )}
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
              onChange={(e) => setValue(e.target.value)}
            ></Textarea>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                addCard();
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
