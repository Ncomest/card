import { useEffect, useState } from "react";
import SelectPlayer from "../../components/select_player/select_player";
import SelectDeck from "../../components/select_deck/select_deck";
import styled from "styled-components";
import Card from "../../components/card/card";

const TableContainer = styled.div`
 padding: 10px;
 display: grid;
 grid-template-columns: repeat(7, 1fr);
 grid-template-rows: repeat(3, 1fr);
 gap: 20px;
`;

interface ICard {
 _id: string;
 url: string;
 name: string;
}

interface ICardState {
 haveDamaged: Number;
 poison: Number;
 blood: Number;
 armor: Number;
 stack: Number;
 stepOver: Boolean;
 stepSkip: Boolean;
}

interface ICardTable {
 _id: number;
 isEmpty: boolean;
 card?: ICard;
 cardState?: ICardState;
}

function Home() {
 const [table, setTable] = useState<ICardTable[]>([]);

 //получение стола каждые 9с (пока нет вебсокета)
 useEffect(() => {
  const interval = setInterval(() => {
   fetch("http://localhost:4000/api/table", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
   })
    .then((res) => res.json())
    .then((res) => setTable(res))
    .catch((err) => console.log(err));
  }, 9000);

  return () => clearInterval(interval);
 }, []);

 //================Drag==============//
 const handleDragStart = (e: any, currentCardId: number) => {
  e.dataTransfer.setData("startDragId", currentCardId);
 };

 const handleDragOver = (e: any) => {
  e.preventDefault();
 };

 const handleCardMovement = async (
  startDragId: number,
  targetCardId: number
 ) => {
  try {
   const res = await fetch(`http://localhost:4000/api/table/${startDragId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
   });

   if (!res.ok) {
    throw new Error("Error get data card");
   }

   const cardData = await res.json();

   const updateResponse = await fetch(
    `http://localhost:4000/api/table/${targetCardId}`,
    {
     method: "PUT",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
      card: cardData.card,
      card_state: cardData.card_state,
      isEmpty: false,
      sourceId: startDragId,
     }),
    }
   );

   if (!updateResponse.ok) {
    throw new Error("Error with upd case");
   }

   const udpateTable = await updateResponse.json();
   console.log("upd data table", udpateTable);

   setTable((prevTable: any) =>
    prevTable.map((cell: any) =>
     cell._id === targetCardId
      ? { ...cell, ...udpateTable }
      : cell._id === startDragId
      ? { ...cell, isEmpty: true, card: null, card_state: null }
      : cell
    )
   );
  } catch (error) {
   console.error("error", error);
  }
 };

 const handleDrop = (e: any, targetCardId: any) => {
  e.preventDefault();
  const startDragId = e.dataTransfer.getData("startDragId");

  console.log("Перетаскиваемая карта с ID:", startDragId);
  console.log("Целевая ячейка с ID:", targetCardId);

  if (startDragId) {
   handleCardMovement(Number(startDragId), targetCardId);
  }
 };
 //================Drag==============//

 return (
  <>
   <SelectPlayer />
   <TableContainer>
    {table
     .sort((a, b) => a._id - b._id)
     .map((item, index) => (
      <div
       key={item._id}
       draggable="true"
       onDragStart={(e) => handleDragStart(e, item._id)}
       onDragOver={handleDragOver}
       onDrop={(e) => handleDrop(e, item._id)}
      >
       <Card item={item} />
      </div>
     ))}
   </TableContainer>
   <SelectDeck />
  </>
 );
}

export default Home;
