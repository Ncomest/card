import React from "react";
import styled from "styled-components";

const ImageStyle = styled.img`
  border-radius: 10px;
  border: 1px solid #bebebe;
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-bottom: 2px;
`;

interface ICard {
  uri: string;
  name: string;
}

const CardInCreateDeck = ({ card }: { card: ICard }) => {
  return (
    <>
      {/* <ImageStyle src={card.uri} alt={card.name} /> */}
      <p>{card.name}</p>
    </>
  );
};

export default CardInCreateDeck;
