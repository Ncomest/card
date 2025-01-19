import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import SelectPlayer from "../../components/select_player/select_player";
import SelectDeck from "../../components/select_deck/select_deck";
import Card from "../../components/card/card";
import Chat from "../../components/chat/chat";
import Rules from "../../components/rules/rules";
import DropRules from "../../components/rules/drop_rules/drop_rules";
import { fetchApi } from "../../helper/fetchApi";

const BackgroundStyle = styled.div`
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

const TableContainerStyle = styled.div`
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

const BorderStyle = styled.div`
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

const CardContainerStyle = styled.div<{ $isEmpty: boolean }>`
  &:hover {
    filter: ${(prop) => !prop.$isEmpty && "brightness(1.1)"};
    z-index: ${(prop) => !prop.$isEmpty && "1"};
  }
`;

const RightSideStyle = styled.div`
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

export interface ICard {
  _id: string;
  coin: string;
  element: string;
  part: string;
  type: string;
  uri: string;
  name: string;
}

export interface ICardState {
  have_damaged: number | null;
  poison: number | null;
  blood: number | null;
  armor: number | null;
  stack: number | null;
  fire: number | null;
  closed: boolean;
  step_over: boolean;
  step_skip: boolean;
}

export interface ICardTable {
  _id: number;
  isEmpty: boolean;
  user: string;
  card?: ICard | null;
  card_state?: ICardState | null;
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
        console.log("data стола от useEffect (home.tsx)", data);
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

    // console.log("cardIndex", e.dataTransfer.getData("cardIndex"));

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

          setTable(resUpdCardOnTable);
        } else if (placePutCard === "hand") {
          const resUpdCardOnHand = await fetchApi({
            API_URI: "/api/hand/update",
            method: "PUT",
            body: {
              user: sessionStorage.getItem("player"),
              card: resCardPickOnTableId.card,
            },
          });

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
        <BackgroundStyle>
          <TableContainerStyle>
            <BorderStyle />
            {table
              ?.sort((a, b) => a._id - b._id)
              .map((item, index) => (
                <CardContainerStyle
                  $isEmpty={item.isEmpty}
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
                </CardContainerStyle>
              ))}
          </TableContainerStyle>
        </BackgroundStyle>

        <SelectDeck
          hand={hand}
          setHand={setHand}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
        />
        <Rules />
      </div>
      <RightSideStyle>
        <DropRules />
        <Chat />
      </RightSideStyle>
    </div>
  );
};

export default Home;
