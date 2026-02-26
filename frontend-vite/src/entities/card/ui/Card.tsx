import React, { useEffect, useRef, useState } from "react";
import { IoIosInformationCircle } from "react-icons/io";
import styled from "styled-components";
import DropMenu from "./drop_menu/DropMenu";
import SideStatus from "./side_status/SideStatus";
import { GiSeaDragon, GiWillowTree, GiBatteredAxe, GiCardBurn } from "react-icons/gi";
import { FaCross } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { cardSize } from "../../../style/global.style";
import type { ICardProps } from "../model/types";

const Component = styled(cardSize)<{
  $empty?: boolean;
  $user: string;
  $isZoom: boolean;
  $itemId: number;
  $isDrag: boolean;
}>`
  position: relative;
  border-radius: 15px;
  transition: transform 0.3s ease;
  outline: 1px solid black;
  z-index: ${(prop) => prop.$isZoom && 1};
  cursor: ${(prop) => !prop.$empty && "pointer"};

  border: 5px solid
    ${(prop) =>
      prop.$user === "player1"
        ? "#705601"
        : prop.$user === "player2"
          ? "#5c0911"
          : "transparent"};

  transform: ${(prop) => {
    if (prop.$isDrag) return "scale(1) translate(0, 0)";

    if (prop.$isZoom) {
      switch (true) {
        case [2, 3, 4, 5, 6].includes(prop.$itemId):
          return "scale(2.4) translateY(30%)";
        case [37, 38, 39, 40, 41].includes(prop.$itemId):
          return "scale(2.4) translateY(-30%)";
        case [8, 15, 22, 29].includes(prop.$itemId):
          return "scale(2.4) translateX(30%)";
        case [14, 21, 28, 35].includes(prop.$itemId):
          return "scale(2.4) translateX(-30%)";
        case [1].includes(prop.$itemId):
          return "scale(2.4) translate(30%, 30%)";
        case [7].includes(prop.$itemId):
          return "scale(2.4) translate(-30%, 30%)";
        case [36].includes(prop.$itemId):
          return "scale(2.4) translate(30%, -30%)";
        case [42].includes(prop.$itemId):
          return "scale(2.4) translate(-30%, -30%)";
        default:
          return "scale(2.4) translate(0, 0)";
      }
    }

    return "scale(1)";
  }};
`;

const Image = styled.img<{ $step_over?: boolean }>`
  border-radius: 10px;
  border: 1px solid #bebebe;
  width: 100%;
  height: 100%;
  object-fit: cover;

  filter: ${(prop) => prop.$step_over && "brightness(50%)"};
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  padding: 5px;
  background: rgba(0, 0, 0, 0.605);
`;

const Dragon = styled(GiSeaDragon)`
  display: flex;
  margin: auto;
  width: 100%;
  height: 100%;
  color: #4d4d4d;
`;

const SpanCrossStyled = styled.span`
  position: absolute;
  top: -18px;
  right: -18px;
`;

const Place = styled(Dragon).attrs({ as: GiWillowTree })``;
const Cross = styled(Dragon).attrs({ as: FaCross })``;
const Banish = styled(Dragon).attrs({ as: GiBatteredAxe })``;
const Deck = styled(Dragon).attrs({ as: GiCardBurn })``;

const Card: React.FC<ICardProps> = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZoom, setIsZoom] = useState(false);
  const [isDraggs, setIsDraggs] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleIsZoom = () => {
    if (!item.isEmpty) setIsZoom((prevZoom) => !prevZoom);
  };

  const handleDragStart = () => {
    setIsDraggs(true);
  };

  const handleDragEnd = () => {
    setIsDraggs(false);
  };

  const toggleDropDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Component
      $itemId={item._id}
      $empty={item.isEmpty}
      $user={item.user}
      id={item._id.toString()}
      $isZoom={!item.isEmpty && isZoom}
      $isDrag={isDraggs}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleIsZoom}
      ref={cardRef}
    >
      {!item.isEmpty && (
        <>
          {item.user === sessionStorage.getItem("player") ||
          !item.card_state?.closed ? (
            <>
              <Image
                src={item.card?.uri}
                alt={item.card?.name}
                $step_over={item.card_state?.step_over}
                loading="lazy"
              />
              {item.card_state && <SideStatus item={item.card_state} isZoom={isZoom} />}
            </>
          ) : (
            <Image src="/image/t_shirt.jpg" alt="Closed card" />
          )}
          {!isOpen && (
            <SpanCrossStyled onClick={toggleDropDown}>
              <IoIosInformationCircle size={25} />
            </SpanCrossStyled>
          )}
          {isOpen && (
            <SpanCrossStyled onClick={() => setIsOpen(false)}>
              <IoIosInformationCircle size={25} />
            </SpanCrossStyled>
          )}
          {isOpen && <DropMenu item={item} ref={dropdownRef} isZoom={isZoom} />}
          {item.card_state?.closed && (
            <FaEye size={22} style={{ position: "absolute", bottom: "-14px", left: "-14px" }} />
          )}
        </>
      )}
      {item.isEmpty && (
        <>
          <Background>
            {[0, 7, 34, 41].includes(index) && <Dragon />}
            {[14, 27].includes(index) && <Place />}
            {[20, 21].includes(index) && <Cross />}
            {[13, 28].includes(index) && <Banish />}
            {[6, 35].includes(index) && <Deck />}
          </Background>
        </>
      )}
    </Component>
  );
};

export default Card;
