import { useEffect, useState } from "react";
import HandCard from "../hand_card/hand_card";
import styled from "styled-components";


const Hand = styled.div`
 padding: 10px;
 display: grid;
 grid-template-columns: repeat(5, 1fr);
 grid-template-rows: repeat(4, 1fr);
 gap: 20px;
 border: 1px solid;
`;

const P = styled.p`
 height: 100px;
 width: 100px;
 border: 1px solid;
`;

export interface IDeck {
 _id: string;
 name: string;
 url: string;
}

const SelectDeck: React.FC = () => {
 const [decks, setDecks] = useState<IDeck[]>([]);

 //===========test=========//
 const [cards, setCards] = useState([
  { id: 1, text: "Card 1" },
  { id: 2, text: "Card 2" },
  { id: 3, text: "Card 3" },
 ]);
 //===========test=========//

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
   {cards.map((card) => (
    <P
     key={card.id}
     draggable
    //  onDragStart={(e) => handleDragStart(e, card.id)}
    //  onDragOver={handleDragOver}
    //  onDrop={(e) => handleDrop(e, card.id)}
    >
     {card.text}
    </P>
   ))}
   <button onClick={() => handleSelectDeck("orcs")}>orcs</button>
   <button onClick={() => handleSelectDeck("humans")}>humans</button>
   <button className="btn btn-primary" onClick={handleUpdateDeck}>
    update
   </button>
   <Hand>
    {decks.map((card, index) => (
     <HandCard key={card._id || index} card={card} />
    ))}
   </Hand>
  </>
 );
};

export default SelectDeck;