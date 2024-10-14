import { useEffect, useState } from "react";
import HandCard from "../hand_card/hand_card";
import styled from "styled-components";
import React from "react";
import {site} from '../../site_state.js'

const Hand = styled.div`
 padding: 10px;
 display: grid;
 grid-template-columns: repeat(10, 1fr);
 grid-template-rows: repeat(2, 1fr);
 gap: 10px;
 border: 1px solid;
 background: linear-gradient(to top right, green 45%, blue 55%);
`;

const Button = styled.button`
 padding: 10px 20px;
 text-align: center;
 transition: 0.5s;
 background-size: 200% auto;
 color: white;
 box-shadow: 0 0 20px #2c2370;
 border-radius: 5px;
 background-image: linear-gradient(
  to right,
  #003cc5 0%,
  #0b63f6 51%,
  #003cc5 100%
 );
 &:hover {
  background-position: right center;
 }
`;

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
 const apiUrl = site;

 //POST select deck
 const handleSelectDeck = (name: string) => {
  sessionStorage.setItem("race", name);
  fetch(apiUrl + "/api/hand/random", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ deck: name, user: sessionStorage.getItem("player") }),
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
  <>
   <Button onClick={() => handleSelectDeck("orcs")}>Random</Button>
   <Button className="btn btn-primary" onClick={handleUpdateDeck}>
    Очистить руку P1 и P2
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
  </>
 );
};

export default SelectDeck;
