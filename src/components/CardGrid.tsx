import React, { useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Card from "./Card";
import { Image } from "@chakra-ui/react";

const CardGrid = () => {
  const [cards, setCards] = useState(Array(11).fill({}));

  return (
    <Grid
      templateColumns="repeat(6, 140px)"
      gap={6}
      margin={8}
      justifyContent="center"
    >
      <GridItem width="140px" height="140px">
        <Image
          alt="create doc"
          src="create-doc.svg"
          borderRadius={8}
          boxSize="100%"
          objectFit="cover"
        ></Image>
      </GridItem>
      {cards.map((card, index) => (
        <GridItem key={index} width="140px" height="140px">
          <Card text={card.text} />
        </GridItem>
      ))}
    </Grid>
  );
};

export default CardGrid;
