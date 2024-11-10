import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { site } from "../../site_state.js";
import styled from "styled-components";

import SelectPlayer from "../../components/select_player/select_player";
import SelectDeck from "../../components/select_deck/select_deck";
import Card from "../../components/card/card";
import Chat from "../../components/chat/chat";
import Rules from "../../components/rules/rules";
import DropRules from "../../components/rules/drop_rules/drop_rules";

const Background = styled.div`
  padding: 10px;
  background: none;
  position: relative;
  display: flex;
  overflow-x: hidden;
  &::before {
    background-image: url("/image/misc/background.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    filter: brightness(45%) blur(1px);
    z-index: -1;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;

const TableContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding: 10px;
  border: 5px solid #000;
  border-radius: 10px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 10px;
  background: rgba(0, 0, 0, 0.25);
`;

const Border = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  width: 71%;
  height: 100%;
  background-color: #ffffff40;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 6px;
    background-color: #bebebe;
  }
`;

const RightSide = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100vh;
  top: 0;
  right: 0;
  width: 30%;
  background: #0b0b0b;
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
  const longPullActive = useRef(true);

  const apiUrl = site;

  const longPull = async () => {
    if (!longPullActive.current) return;

    try {
      const res = await fetch(apiUrl + "/api/table/update", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("Error нет данных от лонгпулла");
      }

      if (res.ok) {
        const updatedTable: ICardTable[] = await res.json();
        console.log(updatedTable, "updatedTable in longpull");
        setTable(updatedTable);

        setTimeout(() => {
          if (longPullActive.current) longPull();
        }, 1000);
      } else {
        console.error("Ошибка получения обновлений:", res.statusText);
        setTimeout(longPull, 500);
      }
    } catch (error) {
      console.error("Ошибка соединения:", error);
      setTimeout(longPull, 500);
    }
  };

  // Получение стола
  useEffect(() => {
    axios
      .get<ICardTable[]>(`${apiUrl}/api/table`)
      .then((res) => setTable(res.data))
      .catch((err) => console.error(err));

    axios
      .post<ICard[]>(apiUrl + "/api/hand", {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: sessionStorage.getItem("player"),
        }),
      })
      .then((res) => setHand(res.data))
      .catch((err) => console.error(err));

    longPull();

    return () => {
      longPullActive.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    console.log("cardIndex", e.dataTransfer.getData("cardIndex"));

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
      Number(e.dataTransfer.getData("casePickTableId")) ===
      Number(casePutTableId)
    ) {
      console.log("так не получиться");
      return;
    }

    // Извлекаем данные из dataTransfer
    const casePickTableId = Number(e.dataTransfer.getData("casePickTableId"));
    const placePickCard = e.dataTransfer.getData("placePickCard");
    const cardIndex = e.dataTransfer.getData("cardIndex");

    console.log(
      { casePickTableId, placePutCard, cardIndex, casePutTableId },
      "data in handleDrop"
    );
    if (!casePickTableId || !casePutTableId) {
      console.error("missing data for handleDrop");
      return;
    }

    try {
      if (cardIndex === undefined) {
        console.error("cardIndex is undefined");
        return;
      }

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
          //  longPull();
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
            throw new Error(
              "Не удалось обновить стол, очистить ячейку от карты"
            );
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
    <div>
      <div style={{ width: "70%" }}>
        <SelectPlayer />
        <Background>
          <TableContainer>
            <Border />
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
                    handleDrop({
                      e,
                      casePutTableId: item._id,
                      placePutCard: "table",
                    })
                  }
                >
                  <Card item={item} index={index} />
                </div>
              ))}
          </TableContainer>
        </Background>

        <SelectDeck
          hand={hand}
          setHand={setHand}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
        />
        <Rules />
      </div>
      <RightSide>
        <DropRules />
        <Chat />
      </RightSide>
    </div>
  );
};

export default Home;
