// import { IDeck } from "../select_deck/select_deck";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import type { ICard } from "@/types/types";
import { cardSize } from "@/style/global.style";

import { URL } from "@/constants/consts";

const Component = styled(cardSize)<{
  $isZoom: boolean;
  $index: number;
  $isDrag: boolean;
}>`
  position: relative;
  width: 100%;
  border: 1px solid #fff;
  border-radius: 5px;
  transition: transform 0.3s ease;
  cursor: pointer;

  z-index: ${(prop) => prop.$isZoom && 2};

  transform: ${(prop) => {
    if (prop.$isDrag) {
      return "scale(1) translate(0, 0)";
    }

    if (prop.$isZoom) {
      switch (true) {
        case [1, 2, 3, 4, 5, 6].includes(prop.$index):
          return "scale(2.4) translateY(20%)";
        case [9, 10, 11, 12, 13, 14].includes(prop.$index):
          return "scale(2.4) translateY(-20%)";
        case [0].includes(prop.$index):
          return "scale(2.4) translate(30%, 20%)";
        case [7].includes(prop.$index):
          return "scale(2.4) translate(-30%, 20%)";
        case [8].includes(prop.$index):
          return "scale(2.4) translate(30%, -20%)";
        case [15].includes(prop.$index):
          return "scale(2.4) translate(-30%, -20%)";
        default:
          return "scale(2.4)";
      }
    }

    return "scale(1)";
  }};
`;

const Image = styled.img`
  border-radius: 5px;
  width: 100%;
  height: 100%;
`;

interface IHandCard {
  card: ICard;
  index: number;
}

const HandCard: React.FC<IHandCard> = ({ card, index }) => {
  const [isZoom, setIsZoom] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Переключаем состояние Zoom
  const handleIsZoom = () => {
    if (!isDragging) {
      setIsZoom((prevZoom) => !prevZoom);
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleClickCard = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsZoom(false);
      }
    };

    if (isZoom) {
      document.addEventListener("mousedown", handleClickCard);
    } else {
      document.removeEventListener("mousedown", handleClickCard);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickCard);
    };
  }, [isZoom]);

  return (
    <Component
      draggable="true"
      $index={index}
      $isZoom={isZoom}
      $isDrag={isDragging}
      onClick={handleIsZoom}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      ref={cardRef}
    >
      <Image src={URL + card.uri} alt={card.name} loading="lazy" />
    </Component>
  );
};

export default HandCard;
