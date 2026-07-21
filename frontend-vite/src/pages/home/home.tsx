import React, { useEffect, useState } from "react";
import styled from "styled-components";

import SelectPlayer from "../../features/select_player/select_player";
import SelectDeck from "../../widgets/player_hand/player_hand";
import { Card } from "@/entities/card";
import Chat from "../../widgets/chat/chat";
import Rules from "../../components/rules/rules";
import DropRules from "../../components/rules/drop_rules/drop_rules";
import { getDataTable } from "@/shared/api";
import { getHand, subscribeWs } from "@/shared/api";
import { useDragAndDrop } from "@/shared/lib/hooks/useDragAndDrop";
import type { ICard, ICardTable } from "@/shared/lib/types/types";

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
  touch-action: none;
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

const Home: React.FC = () => {
  const [table, setTable] = useState<ICardTable[]>([]);
  const [hand, setHand] = useState<ICard[]>([]);

  const {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleTouchStart,
    handleTouchEnd,
  } = useDragAndDrop({ hand, setTable, setHand });

  useEffect(() => {
    const init = async () => {
      try {
        const [tableData, handData] = await Promise.all([
          getDataTable(),
          getHand(sessionStorage.getItem("player")),
        ]);
        setTable(tableData);
        setHand(handData);
      } catch (error) {
        console.error("Ошибка инициализации данных:", error);
      }
    };

    init();

    const unsubscribeTable = subscribeWs<{ table: ICardTable[] }>(
      "table:update",
      ({ table: nextTable }) => {
        if (Array.isArray(nextTable)) {
          setTable(nextTable);
        }
      },
    );

    return () => {
      unsubscribeTable();
    };
  }, []);

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
                  data-drop-id={item._id}
                  data-drop-place="table"
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
                  onTouchStart={() =>
                    !item.isEmpty &&
                    handleTouchStart({
                      casePickTableId: item._id,
                      cardId: item.card?._id ?? null,
                      placePickCard: "table",
                    })
                  }
                  onTouchEnd={(e) => handleTouchEnd(e, item._id, "table")}
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
          handleTouchStart={handleTouchStart}
          handleTouchEnd={handleTouchEnd}
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
