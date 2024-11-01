import React, { useEffect, useState } from "react";
import SelectPlayer from "../../components/select_player/select_player";
import SelectDeck from "../../components/select_deck/select_deck";
import styled from "styled-components";
import Card from "../../components/card/card";
import DiceRoll from "../../components/dice_roll/dice_roll";
import { site } from "../../site_state.js";
import Chat from "../../components/chat/chat";

const TableContainer = styled.div`
 border-radius: 10px;
 border: 5px solid #000000;
 outline: 1px wheat;
 flex: 75%;
 min-height: 100vh;
 max-width: 1000px;
 margin: 10px;
 padding: 10px;
 display: grid;
 grid-template-columns: repeat(7, 1fr);
 grid-template-rows: repeat(3, 1fr);
 gap: 10px 20px;
 margin-bottom: 20px;
 background: rgba(0, 0, 0, 0.25);
`;

const Background = styled.div`
 background: none;
 position: relative;
 &::before {
  background-image: url("/image/misc/background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: brightness(45%) blur(1px);
  z-index: -1;
  content: "";
  top: 80px;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
 }
`;

interface ICard {
 _id: string;
 url: string;
 name: string;
}

interface ICardState {
 haveDamaged: number | null;
 poison: number | null;
 blood: number | null;
 armor: number | null;
 stack: number | null;
 fire: number | null;
 closed: boolean;
 stepOver: boolean;
 stepSkip: boolean;
}

interface ICardTable {
 _id: number;
 isEmpty: boolean;
 user: string;
 card?: ICard | null;
 cardState?: ICardState | null;
}

interface IDrag {
 e?: any;
 casePickTableId?: number;
 casePutTableId?: number;
 cardId?: string | null;
 placePickCard?: string;
 placePutCard?: string;
 cardIndex?: number;
}

const Home: React.FC = () => {
 const [table, setTable] = useState<ICardTable[]>([]);
 const [hand, setHand] = useState<ICard[]>([]);

 const apiUrl = site;

 //получение стола каждые 9с (пока нет вебсокета)
 useEffect(() => {
  const interval = setInterval(() => {
   fetch(`${apiUrl}/api/table`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
   })
    .then((res) => res.json())
    .then((res) => setTable(res))
    .catch((err) => console.log(err));
  }, 9000);

  return () => clearInterval(interval);
 }, [apiUrl]);

 //Auto-fetch hand cards
 useEffect(() => {
  fetch(apiUrl + "/api/hand", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({
    user: sessionStorage.getItem("player"),
   }),
  })
   .then((res) => res.json())
   .then((data: ICard[]) => setHand(data))
   .catch((err) => console.log(err));
 }, [apiUrl]);

 //================Drag==============//
 const handleDragStart = ({
  e,
  casePickTableId,
  cardId,
  placePickCard,
  cardIndex,
 }: IDrag) => {
  // Передаем данные о карте через dataTransfer
  e.dataTransfer.setData("casePickTableId", casePickTableId);
  e.dataTransfer.setData("placePickCard", placePickCard);
  e.dataTransfer.setData("cardIndex", cardIndex);

  if (cardId) {
   e.dataTransfer.setData("cardId", cardId);
  }
 };

 const handleDragOver = (e: any) => {
  e.preventDefault();
 };

 const handleDrop = async ({ e, casePutTableId, placePutCard }: IDrag) => {
  e.preventDefault();

  if (
   Number(e.dataTransfer.getData("casePickTableId")) === Number(casePutTableId)
  ) {
   console.log("так не получиться");
   return;
  }

  try {
   // Извлекаем данные из dataTransfer
   const casePickTableId = Number(e.dataTransfer.getData("casePickTableId"));
   const placePickCard = e.dataTransfer.getData("placePickCard");
   const cardIndex = e.dataTransfer.getData("cardIndex");

   console.log("index ячейки в руке cardIndex", cardIndex);

   if (placePickCard === "table") {
    // отправим запрос на получение данных
    const resCardPickOnTableId = await fetch(
     apiUrl + `/api/table/${casePickTableId}`
    );

    if (!resCardPickOnTableId.ok) {
     throw new Error("ошибка получения запроса по id со стола");
    }

    const resCardFromTableId = await resCardPickOnTableId.json();
    console.log(
     `получение данных с ячейки с ${casePickTableId} сервера resCardFromTableId`,
     resCardFromTableId
    );

    if (placePutCard === "table") {
     console.log("сработал if положить со стола на стол");
     // отправим запрос на обновление данных
     const resUpdCardOnTable = await fetch(
      apiUrl + `/api/table/${casePutTableId}`,
      {
       method: "PUT",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
        placePickCard: placePickCard, // место откуда берем карту стол или рука
        placePutCard: placePutCard, // место куда кладем карту стол или рука
        casePickTableId: casePickTableId, // ячейка id или -1 если hand, откуда взяли карту
        casePutTableId: casePutTableId, // ячейка id или -1 если hand, куда кладем карту
        card: resCardFromTableId.card,
        card_state: resCardFromTableId.card_state,
        isEmpty: false,
        user: sessionStorage.getItem("player"),
       }),
      }
     );

     if (!resUpdCardOnTable.ok) {
      throw new Error("Не получилось обновить данные в БД");
     }

     const updatedCardOnTable = await resUpdCardOnTable.json();
     setTable(updatedCardOnTable);
     console.log(
      `обновленные данные которые теперь в ячейке ${casePutTableId} в бд updatedCardOnTable`,
      updatedCardOnTable
     );
    } else if (placePutCard === "hand") {
     const resUpdCardOnHand = await fetch(apiUrl + "/api/hand/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
       user: sessionStorage.getItem("player"),
       card: resCardFromTableId.card,
      }),
     });

     if (!resUpdCardOnHand.ok) {
      throw new Error("Не получилось обновить данные руки на сервере");
     }

     const resCardFromHand = await resUpdCardOnHand.json();
     setHand(resCardFromHand);
     console.log("resCardFromHand", resCardFromHand);

     const resUpdCardOnTable = await fetch(
      apiUrl + `/api/table/${casePickTableId}`,
      {
       method: "PUT",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
        placePickCard: placePickCard, // место откуда берем карту стол или рука
        placePutCard: placePutCard, // место куда кладем карту стол или рука
        casePickTableId: casePickTableId, // ячейка id или -1 если hand, откуда взяли карту
        casePutTableId: casePutTableId, // ячейка id или -1 если hand, куда кладем карту
        isEmpty: true,
       }),
      }
     );

     if (!resUpdCardOnTable.ok) {
      throw new Error("Не удалось обновить стол, очистить ячейку от карты");
     }

     const updatedCardOnTable = await resUpdCardOnTable.json();
     setTable(updatedCardOnTable);
    }
   } else if (placePickCard === "hand") {
    console.log("взяли карту с руки");

    const resCardOnHand = await fetch(apiUrl + "/api/hand/", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
      user: sessionStorage.getItem("player"),
     }),
    });

    if (!resCardOnHand.ok) {
     throw new Error("Не получилось получить данные с руки");
    }

    const resCardFromHand = await resCardOnHand.json();
    console.log("resCardFromHand[cardindex]", resCardFromHand[cardIndex]);

    if (placePutCard === "hand") {
     console.log("сработал if взяли с руки и положили в руку");
    } else if (placePutCard === "table") {
     console.log("сработал if взяли карту с руки и положили на стол");

     const resUpdCardOnTable = await fetch(
      apiUrl + `/api/table/${casePutTableId}`,
      {
       method: "PUT",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
        placePickCard: placePickCard, // место откуда берем карту стол или рука
        placePutCard: placePutCard, // место куда кладем карту стол или рука
        casePickTableId: casePickTableId, // ячейка id или -1 если hand, откуда взяли карту
        casePutTableId: casePutTableId, // ячейка id или -1 если hand, куда кладем карту
        card: resCardFromHand[cardIndex],
        isEmpty: false,
        user: sessionStorage.getItem("player"),
       }),
      }
     );

     if (!resUpdCardOnTable.ok) {
      throw new Error("не удалось обновить данные на столе в бд");
     }

     const resUpdCardFromTable = await resUpdCardOnTable.json();
     setTable(resUpdCardFromTable);

     //=============== запрос на обновление данных в руке
     const resUpdCardOnHand = await fetch(apiUrl + "/api/hand/filter", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
       user: sessionStorage.getItem("player"),
       cardIndex: Number(cardIndex),
      }),
     });

     if (!resUpdCardOnHand.ok) {
      throw new Error("не получилось обновить данные в руке");
     }

     const updatedCardFromHand = await resUpdCardOnHand.json();
     setHand(updatedCardFromHand);
    }
   }
  } catch (error) {
   console.error("Error:", error);
  }
 };
 //================Drag==============//

 return (
  <Background>
   <SelectPlayer />
   <div style={{ display: "flex" }}>
    <TableContainer>
     {table
      ?.sort((a, b) => a._id - b._id)
      .map((item, index) => (
       <div
        key={index}
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
    <div style={{ display: "flex", flexDirection: "column", flex: "25%" }}>
     <DiceRoll />
     <Chat />
    </div>
   </div>

   <SelectDeck
    hand={hand}
    setHand={setHand}
    handleDragStart={handleDragStart}
    handleDragOver={handleDragOver}
    handleDrop={handleDrop}
   />
  </Background>
 );
};

export default Home;
