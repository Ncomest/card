import React, { useEffect, useState } from "react";
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
 margin-bottom: 20px;
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
 card?: ICard | null;
 cardState?: ICardState;
}

interface IDrag {
 e?: any;
 casePickTableId?: number;
 casePutTableId?: number;
 cardId?: string | null;
 placePickCard?: string;
 placePutCard?: string;
}

const Home: React.FC = () => {
 const [table, setTable] = useState<ICardTable[]>([]);

 //получение стола каждые 9с (пока нет вебсокета)
 useEffect(() => {
  // const interval = setInterval(() => {
  fetch("http://localhost:4000/api/table", {
   method: "GET",
   headers: { "Content-Type": "application/json" },
  })
   .then((res) => res.json())
   .then((res) => setTable(res))
   .catch((err) => console.log(err));
  // }, 9000);

  // return () => clearInterval(interval);
 }, []);

 //================Drag==============//
 const handleDragStart = ({
  e,
  casePickTableId,
  cardId,
  placePickCard,
 }: IDrag) => {
  // Передаем данные о карте через dataTransfer
  e.dataTransfer.setData("casePickTableId", casePickTableId);
  e.dataTransfer.setData("placePickCard", placePickCard);

  if (cardId) {
   e.dataTransfer.setData("cardId", cardId);
  }
 };

 const handleDragOver = (e: any) => {
  e.preventDefault();
 };

 const handleDrop = async ({ e, casePutTableId, placePutCard }: IDrag) => {
  e.preventDefault();
  try {
   // Извлекаем данные из dataTransfer
   const casePickTableId = Number(e.dataTransfer.getData("casePickTableId"));
   const cardId = e.dataTransfer.getData("cardId");
   const placePickCard = e.dataTransfer.getData("placePickCard");
   console.log("Место откуда берем карту", placePickCard);
   console.log("Место куда кладем карту", placePutCard);
   console.log("id ячейки стола откуда взяли карту casePickTableId", casePickTableId);
   console.log("id ячейки стола куда кладем карту casePutTableId", casePutTableId);

   //Куда кладем карту
   if (placePutCard === "table") {
    console.log("Сработал if table (Положить карту на стол)");

    // отправим запрос на получение данных
    const res = await fetch(`http://localhost:4000/api/table/${casePickTableId}`)

    if(!res.ok){
      throw new Error('ошибка получения запроса по id со стола')
    }
    const cardRes = await res.json()
    console.log('cardRes', cardRes)

    // отправим запрос на обновление данных
    const updateResponse = await fetch(`http://localhost:4000/api/table/${casePutTableId}`,{
      method: "PUT",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({
        placePickCard: placePickCard, // место откуда берем карту стол или рука
        placePutCard: placePutCard, // место куда кладем карту стол или рука
        casePickTableId : casePickTableId, // ячейка id или -1 если hand, откуда взяли карту
        casePutTableId : casePutTableId, // ячейка id или -1 если hand, куда кладем карту 
        card: cardRes.card,
        card_state: cardRes.card_state,
        isEmpty: false,
        user: sessionStorage.getItem('player')
      })
    })

    if(!updateResponse.ok){
      throw new Error("Ошибка при обновлении карты")
    }

    const updatedTable = updateResponse.json()
    console.log('updatedTable', updatedTable)

   } else if (placePutCard === "hand") {
    console.log("Сработал if hand");

    // Делаем запрос на то что в руке
    const res = await fetch("http://localhost:4000/api/hand/update",{
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({
        user: sessionStorage.getItem('player')
      })
    })

    
    if(!res.ok){
      throw new Error("Ошибка получения данных карт в руке")
    }
    
    const handRes = await res.json();
    console.log("handRes", handRes);
   }


   // Если placePickCard - "hand", значит карта берется из руки
   //  if (placePickCard === "hand") {
   //   const res = await fetch(`http://localhost:4000/api/hand/${cardId}`, {
   //    method: "GET",
   //    headers: { "Content-Type": "application/json" },
   //   });

   // if (!res.ok) {
   //  throw new Error("Error getting card data");
   // }

   // const cardData = await res.json();

   // const updateResponse = await fetch(
   //  `http://localhost:4000/api/table/${casePutTableId}`,
   //  {
   //   method: "PUT",
   //   headers: { "Content-Type": "application/json" },
   //   body: JSON.stringify({
   //    card: cardData.card,
   //    cardState: cardData.cardState,
   //    isEmpty: false,
   //    sourceId: casePickTableId,
   //   }),
   //  }
   // );

   // if (!updateResponse.ok) {
   //  throw new Error("Error updating table");
   // }

   // const updatedTable = await updateResponse.json();
   // setTable((prevTable) =>
   //  prevTable.map((cell) =>
   //   cell._id === casePutTableId
   //    ? { ...cell, ...updatedTable }
   //    : cell._id === casePickTableId && placePickCard !== "hand"
   //    ? { ...cell, isEmpty: true, card: null, cardState: null }
   //    : cell
   //  )
   // );
   //  }
  } catch (error) {
   console.error("Error:", error);
  }
 };
 //================Drag==============//

 return (
  <>
   <SelectPlayer />
   <TableContainer>
    {table
     .sort((a, b) => a._id - b._id)
     .map((item) => (
      <div
       key={item._id}
       draggable={!item.isEmpty}
       onDragStart={(e) =>
        handleDragStart({
         e,
         casePickTableId: item._id,
         cardId: item.card?._id ?? null,
         placePickCard: "table",
        })
       }
       onDragOver={handleDragOver}
       onDrop={(e) =>
        handleDrop({ e, casePutTableId: item._id, placePutCard: "table" })
       }
      >
       <Card item={item} />
      </div>
     ))}
   </TableContainer>
   <SelectDeck
    handleDragStart={handleDragStart}
    handleDragOver={handleDragOver}
    handleDrop={handleDrop}
   />
  </>
 );
};

export default Home;
