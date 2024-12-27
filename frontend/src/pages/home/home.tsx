import React, { useEffect, useRef, useState } from "react";
import { site } from "../../site_state.js";
import styled from "styled-components";

import SelectPlayer from "../../components/select_player/select_player";
import SelectDeck from "../../components/select_deck/select_deck";
import Card from "../../components/card/card";
import Chat from "../../components/chat/chat";
import Rules from "../../components/rules/rules";
import DropRules from "../../components/rules/drop_rules/drop_rules";
import { fetchApi } from "../../helper/fetchApi";

const Background = styled.div`
  padding: 10px;
  background: none;
  position: relative;
  display: flex;
  overflow: hidden;
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
  @media (max-width: 768px) {
    gap: 5px;
    border: 2px solid #000;
    border-radius: 5px;
  }
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
      const data = await fetchApi({ API_URI: "/api/table/update" });

      if (data) {
        setTable(data);
        setTimeout(() => {
          if (longPullActive.current) longPull();
        }, 1000);
      } else {
        console.error("Ошибка получения обновлений:");
        setTimeout(longPull, 500);
      }
    } catch (error) {
      console.error("Ошибка соединения:", error);
      setTimeout(longPull, 500);
    }
  };

  // Получение стола и руки
  useEffect(() => {
    const fetchTable = async () => {
      try {
        const data = await fetchApi({ API_URI: "/api/table" });
        setTable(data);
      } catch (error) {
        console.error("ошибка");
        throw new Error("Данные стола не получены");
      }
    };

    const fetchHand = async () => {
      try {
        const data = await fetchApi({
          API_URI: "/api/hand",
          method: "POST",
          body: { user: sessionStorage.getItem("player") },
        });
        console.log("рука данные data", data);
        setHand(data);
      } catch (error) {
        console.error("ошибка");
        throw new Error("Данные руки не получены");
      }
    };

    fetchTable();
    fetchHand();
    longPull();

    return () => {
      longPullActive.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      // console.log("так не получиться");
      return;
    }

    // Извлекаем данные из dataTransfer
    const casePickTableId = Number(e.dataTransfer.getData("casePickTableId"));
    const placePickCard = e.dataTransfer.getData("placePickCard");
    const cardIndex = e.dataTransfer.getData("cardIndex");

    // console.log(
    //   { casePickTableId, placePutCard, cardIndex, casePutTableId },
    //   "data in handleDrop"
    // );
    if (!casePickTableId || !casePutTableId) {
      // console.error("missing data for handleDrop");
      return;
    }

    try {
      if (cardIndex === undefined) {
        // console.error("cardIndex is undefined");
        return;
      }

      // console.log("index ячейки в руке cardIndex", cardIndex);

      if (placePickCard === "table") {
        // отправим запрос на получение данных
        const resCardPickOnTableId = await fetchApi({
          API_URI: `/api/table/${casePickTableId}`,
        });

        // console.log(
        //   `получение данных с ячейки с ${casePickTableId} сервера resCardPickOnTableId`,
        //   resCardPickOnTableId
        // );

        if (placePutCard === "table") {
          // console.log("сработал if положить со стола на стол");
          // отправим запрос на обновление данных
          const resUpdCardOnTable = await fetchApi({
            API_URI: `/api/table/${casePutTableId}`,
            method: "PUT",
            body: {
              placePickCard: placePickCard, // место откуда берем карту стол или рука
              placePutCard: placePutCard, // место куда кладем карту стол или рука
              casePickTableId: casePickTableId, // ячейка id или -1 если hand, откуда взяли карту
              casePutTableId: casePutTableId, // ячейка id или -1 если hand, куда кладем карту
              card: resCardPickOnTableId.card,
              card_state: resCardPickOnTableId.card_state,
              isEmpty: false,
              user: sessionStorage.getItem("player"),
            },
          });

          // const resUpdCardOnTable = await fetch(
          //   apiUrl + `/api/table/${casePutTableId}`,
          //   {
          //     method: "PUT",
          //     headers: { "Content-Type": "application/json" },
          //     body: JSON.stringify({
          //       placePickCard: placePickCard, // место откуда берем карту стол или рука
          //       placePutCard: placePutCard, // место куда кладем карту стол или рука
          //       casePickTableId: casePickTableId, // ячейка id или -1 если hand, откуда взяли карту
          //       casePutTableId: casePutTableId, // ячейка id или -1 если hand, куда кладем карту
          //       card: resCardPickOnTableId.card,
          //       card_state: resCardPickOnTableId.card_state,
          //       isEmpty: false,
          //       user: sessionStorage.getItem("player"),
          //     }),
          //   }
          // );

          // if (!resUpdCardOnTable.ok) {
          //   throw new Error("Не получилось обновить данные в БД");
          // }

          // const updatedCardOnTable = await resUpdCardOnTable.json();
          setTable(resUpdCardOnTable);
          // console.log(
          //   `обновленные данные которые теперь в ячейке ${casePutTableId} в бд updatedCardOnTable`,
          //   resUpdCardOnTable
          // );
        } else if (placePutCard === "hand") {
          const resUpdCardOnHand = await fetchApi({
            API_URI: "/api/hand/update",
            method: "PUT",
            body: {
              user: sessionStorage.getItem("player"),
              card: resCardPickOnTableId.card,
            },
          });
          // const resUpdCardOnHand = await fetch(apiUrl + "/api/hand/update", {
          //   method: "PUT",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify({
          //     user: sessionStorage.getItem("player"),
          //     card: resCardPickOnTableId.card,
          //   }),
          // });

          // if (!resUpdCardOnHand.ok) {
          //   throw new Error("Не получилось обновить данные руки на сервере");
          // }

          // const resCardFromHand = await resUpdCardOnHand.json();
          setHand(resUpdCardOnHand);
          // console.log("resUpdCardOnHand", resUpdCardOnHand);

          const resUpdCardOnTable = await fetchApi({
            API_URI: `/api/table/${casePickTableId}`,
            method: "PUT",
            body: {
              placePickCard: placePickCard, // место откуда берем карту стол или рука
              placePutCard: placePutCard, // место куда кладем карту стол или рука
              casePickTableId: casePickTableId, // ячейка id или -1 если hand, откуда взяли карту
              casePutTableId: casePutTableId, // ячейка id или -1 если hand, куда кладем карту
              isEmpty: true,
            },
          });

          // const resUpdCardOnTable = await fetch(
          //   apiUrl + `/api/table/${casePickTableId}`,
          //   {
          //     method: "PUT",
          //     headers: { "Content-Type": "application/json" },
          //     body: JSON.stringify({
          //       placePickCard: placePickCard, // место откуда берем карту стол или рука
          //       placePutCard: placePutCard, // место куда кладем карту стол или рука
          //       casePickTableId: casePickTableId, // ячейка id или -1 если hand, откуда взяли карту
          //       casePutTableId: casePutTableId, // ячейка id или -1 если hand, куда кладем карту
          //       isEmpty: true,
          //     }),
          //   }
          // );

          // if (!resUpdCardOnTable.ok) {
          //   throw new Error(
          //     "Не удалось обновить стол, очистить ячейку от карты"
          //   );
          // }

          // const updatedCardOnTable = await resUpdCardOnTable.json();
          setTable(resUpdCardOnTable);
        }
      } else if (placePickCard === "hand") {
        // console.log("взяли карту с руки");

        const resCardOnHand = await fetchApi({
          API_URI: "/api/hand/",
          method: "POST",
          body: {
            user: sessionStorage.getItem("player"),
          },
        });

        // const resCardOnHand = await fetch(apiUrl + "/api/hand/", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     user: sessionStorage.getItem("player"),
        //   }),
        // });

        // if (!resCardOnHand.ok) {
        //   throw new Error("Не получилось получить данные с руки");
        // }

        // const resCardFromHand = await resCardOnHand.json();
        // console.log("resCardFromHand[cardindex]", resCardOnHand[cardIndex]);

        if (placePutCard === "hand") {
          // console.log("сработал if взяли с руки и положили в руку");
        } else if (placePutCard === "table") {
          // console.log("сработал if взяли карту с руки и положили на стол");

          const resUpdCardOnTable = await fetchApi({
            API_URI: `/api/table/${casePutTableId}`,
            method: "PUT",
            body: {
              placePickCard: placePickCard, // место откуда берем карту стол или рука
              placePutCard: placePutCard, // место куда кладем карту стол или рука
              casePickTableId: casePickTableId, // ячейка id или -1 если hand, откуда взяли карту
              casePutTableId: casePutTableId, // ячейка id или -1 если hand, куда кладем карту
              card: resCardOnHand[cardIndex],
              isEmpty: false,
              user: sessionStorage.getItem("player"),
            },
          });

          // const resUpdCardOnTable = await fetch(
          //   apiUrl + `/api/table/${casePutTableId}`,
          //   {
          //     method: "PUT",
          //     headers: { "Content-Type": "application/json" },
          //     body: JSON.stringify({
          //       placePickCard: placePickCard, // место откуда берем карту стол или рука
          //       placePutCard: placePutCard, // место куда кладем карту стол или рука
          //       casePickTableId: casePickTableId, // ячейка id или -1 если hand, откуда взяли карту
          //       casePutTableId: casePutTableId, // ячейка id или -1 если hand, куда кладем карту
          //       card: resCardOnHand[cardIndex],
          //       isEmpty: false,
          //       user: sessionStorage.getItem("player"),
          //     }),
          //   }
          // );

          // if (!resUpdCardOnTable.ok) {
          //   throw new Error("не удалось обновить данные на столе в бд");
          // }

          // const resUpdCardFromTable = await resUpdCardOnTable.json();
          setTable(resUpdCardOnTable);

          //=============== запрос на обновление данных в руке
          const resUpdCardOnHand = await fetchApi({
            API_URI: "/api/hand/filter",
            method: "PUT",
            body: {
              user: sessionStorage.getItem("player"),
              cardIndex: Number(cardIndex),
            },
          });

          // const resUpdCardOnHand = await fetch(apiUrl + "/api/hand/filter", {
          //   method: "PUT",
          //   headers: { "Content-Type": "application/json" },
          //   body: JSON.stringify({
          //     user: sessionStorage.getItem("player"),
          //     cardIndex: Number(cardIndex),
          //   }),
          // });

          // if (!resUpdCardOnHand.ok) {
          //   throw new Error("не получилось обновить данные в руке");
          // }

          // const updatedCardFromHand = await resUpdCardOnHand.json();
          setHand(resUpdCardOnHand);
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
