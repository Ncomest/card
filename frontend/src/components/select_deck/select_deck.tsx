import HandCard from "../hand_card/hand_card";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { site } from "../../site_state.js";
import { StyledButton } from "../../style/global.style";

const Component = styled.div`
  background: #0b0b0b;
  padding: 20px 0 100px 0;
  overflow: hidden;
`;

const Hand = styled.div`
  margin: 0 auto;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  border: 1px solid;
  background: rgba(0, 0, 0, 0.434);
`;

const Button = styled(StyledButton)``;

export interface IDeck {
  _id: string;
  name: string;
  url: string;
}

export interface IDrag {
  e?: any;
  casePickTableId?: number;
  casePutTableId?: number;
  cardId?: string | null;
  placePickCard?: string;
  placePutCard?: string;
  cardIndex?: number;
}

interface ICard {
  _id: string;
  url: string;
  name: string;
}

interface SelectDeckProps {
  handleDragStart: ({
    e,
    casePickTableId,
    cardId,
    placePickCard,
    cardIndex,
  }: IDrag) => void;
  handleDragOver: (e: any) => void;
  handleDrop: ({ e, casePutTableId }: IDrag) => void;
  hand: ICard[];
  setHand: React.Dispatch<React.SetStateAction<ICard[]>>;
}

const SelectDeck: React.FC<SelectDeckProps> = ({
  hand,
  setHand,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) => {
  const [decks, setDecks] = useState<[string]>([""]);
  const apiUrl = site;

  useEffect(() => {
    fetch(apiUrl + "/api/decks")
      .then((res) => res.json())
      .then((data: [string]) => setDecks(data))
      .catch((err) => console.log(err));
  }, [apiUrl]);

  //POST select deck
  const handleSelectDeck = (name: string) => {
    sessionStorage.setItem("race", name);
    fetch(apiUrl + "/api/hand/random", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deck: name,
        user: sessionStorage.getItem("player"),
      }),
    })
      .then((res) => res.json())
      .then((data: ICard[]) => setHand(data))
      .catch((err) => console.error("Ошибка при получении данных:", err));
  };

  //PUT clear hand
  const handleUpdateDeck = () => {
    fetch(apiUrl + "/api/hand/refresh", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: sessionStorage.getItem("player") }),
    })
      .then((res) => res.json())
      .then((data: IDeck[]) => setHand(data))
      .catch((err) => console.error("Ошибка при получении данных:", err));
  };

  return (
    <Component>
      {decks.map((deck, i) => (
        <Button key={i} onClick={() => handleSelectDeck(`${deck}`)}>
          <span>{deck}</span>
        </Button>
      ))}
      <Button className="btn btn-primary" onClick={handleUpdateDeck}>
        <span>Удалить карты из руки</span>
      </Button>
      <Hand>
        {hand.map((card, index) => (
          <div
            key={index}
            draggable={true}
            onDragStart={(e) =>
              handleDragStart({
                e,
                cardId: card._id,
                placePickCard: "hand",
                casePickTableId: -1,
                cardIndex: index,
              })
            }
            onDragOver={handleDragOver}
            onDrop={(e) =>
              handleDrop({
                e,
                placePutCard: "hand",
                casePutTableId: -1,
              })
            }
          >
            <HandCard card={card} />
          </div>
        ))}
      </Hand>
    </Component>
  );
};

export default SelectDeck;
