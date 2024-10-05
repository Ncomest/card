import { useEffect, useState } from "react";
import HandCard from "../hand_card/hand_card";
import styled from "styled-components";
import React from "react";

const Hand = styled.div`
 padding: 10px;
 display: grid;
 grid-template-columns: repeat(5, 1fr);
 grid-template-rows: repeat(4, 1fr);
 gap: 20px;
 border: 1px solid;
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
}

interface SelectDeckProps {
 handleDragStart: ({
  e,
  casePickTableId,
  cardId,
  placePickCard,
 }: IDrag) => void;
 handleDragOver: (e: any) => void;
 handleDrop: ({ e, casePutTableId }: IDrag) => void;
}

const SelectDeck: React.FC<SelectDeckProps> = ({
 handleDragStart,
 handleDragOver,
 handleDrop,
}) => {
 const [decks, setDecks] = useState<IDeck[]>([]);

 //POST select deck
 const handleSelectDeck = (name: string) => {
  sessionStorage.setItem("race", name);
  fetch("http://localhost:4000/api/hand", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ deck: name, user: sessionStorage.getItem("player") }),
  })
   .then((res) => res.json())
   .then((data: IDeck[]) => setDecks(data))
   .catch((err) => console.error("Ошибка при получении данных:", err));
 };

 //Auto-fetch hand cards
 useEffect(() => {
  fetch("http://localhost:4000/api/hand/update", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({
    user: sessionStorage.getItem("player"),
   }),
  })
   .then((res) => res.json())
   .then((data: IDeck[]) => setDecks(data))
   .catch((err) => console.log(err));
 }, []);

 //PUT clear hand
 const handleUpdateDeck = () => {
  fetch("http://localhost:4000/api/hand", {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ user: sessionStorage.getItem("player") }),
  })
   .then((res) => res.json())
   .then((data: IDeck[]) => setDecks(data))
   .catch((err) => console.error("Ошибка при получении данных:", err));
 };

 return (
  <>
   <Button onClick={() => handleSelectDeck("orcs")}>Random</Button>
   {/* <Button onClick={() => handleSelectDeck("humans")}>humans</Button> */}
   <Button className="btn btn-primary" onClick={handleUpdateDeck}>
    Очистить руку P1 и P2
   </Button>
   {/* <button onClick={(e) => handleHandDragStart(e, 42)}>log</button> */}
   <Hand>
    {decks.map((card) => (
     <div
      key={card._id}
      draggable={true}
      onDragStart={(e) =>
       handleDragStart({
        e,
        cardId: card._id,
        placePickCard: "hand",
        casePickTableId: -1,
       })
      }
      onDragOver={handleDragOver}
      onDrop={(e) =>
       handleDrop({ e, placePutCard: "hand", casePutTableId: -1 })
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
