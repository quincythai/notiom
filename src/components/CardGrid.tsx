import React, { useState } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Card from "./Card";
import { Image } from "@chakra-ui/react";

const CardGrid = () => {
  const [cards, setCards] = useState([]);

  return (
    <Grid
      templateColumns="repeat(6, 140px)"
      gap={6}
      margin={8}
      justifyContent="center"
    >
      <GridItem w="140px" h="140px">
        <Image
          alt="create doc"
          src="create-doc.svg"
          borderRadius={8}
          boxSize="100%"
          objectFit="cover"
        ></Image>
      </GridItem>
      <GridItem w="140px" h="140px">
        <Card></Card>
      </GridItem>
      <GridItem w="140px" h="140px">
        <Card text="Specific text"></Card>
      </GridItem>
      <GridItem w="140px" h="140px">
        <Card></Card>
      </GridItem>
      <GridItem>
        <Card text="Longer text that will truncate maybe really hello"></Card>
      </GridItem>
      <GridItem w="140px" h="140px">
        <Card></Card>
      </GridItem>
      <GridItem w="140px" h="140px">
        <Card></Card>
      </GridItem>
      <GridItem w="140px" h="140px">
        <Card></Card>
      </GridItem>
      <GridItem w="140px" h="140px">
        <Card></Card>
      </GridItem>
      <GridItem w="140px" h="140px">
        <Card></Card>
      </GridItem>
      <GridItem w="140px" h="140px">
        <Card></Card>
      </GridItem>
      <GridItem w="140px" h="140px">
        <Card></Card>
      </GridItem>
    </Grid>
  );
};

export default CardGrid;

/* 
CardGrid where 1st is the adder card

*/
