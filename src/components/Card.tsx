import React from "react";
import { Box } from "@chakra-ui/react";

interface CardProps {
  text?: string; // Question mark means make the text prop optional i.e. put lorem default
}

const Card: React.FC<CardProps> = ({
  text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non consequuntur sapiente sequi tempore molestias fuga ducimus! Itaque, blanditiis nihil? Cum quaerat dignissimos sunt, atque provident blanditiis suscipit autem! Neque, illo?",
}) => {
  const trimText = (text: string, wordLimit: number): string => {
    const wordsArray = text.split(" ");
    if (wordsArray.length > wordLimit) {
      return wordsArray.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const trimmedText = trimText(text, 5);

  return (
    <Box
      border="1px"
      borderColor="gray"
      padding={4}
      borderRadius={8}
      width="100%"
      height="100%"
    >
      {trimmedText}
    </Box>
  );
};

export default Card;
