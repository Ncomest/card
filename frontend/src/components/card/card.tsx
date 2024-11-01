import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DropMenu from "./drop__menu/drop__menu";
import SideStatus from "./side_status/side_status";

const Component = styled.div<{
 $empty?: boolean;
 $user: string;
 $isZoom: boolean;
}>`
 height: 160px;
 position: relative;
 border: 5px solid
  ${(prop) =>
   prop.$user === "player1"
    ? "#705601"
    : prop.$user === "player2"
    ? "#5c0911"
    : "transparent"};
 border-radius: 10px;
 transition: transform 0.3s ease;
 outline: 1px solid black;

 transform: ${(isZoom) => isZoom.$isZoom && "scale(2.4)"};
 z-index: ${(isZoom) => isZoom.$isZoom && 1};
`;

const Image = styled.img<{ $step_over?: boolean }>`
 width: 100%;
 height: 100%;
 filter: ${(prop) => prop.$step_over && "brightness(50%)"};
`;

const ImageEye = styled.img`
 width: 30px;
 height: 30px;
 border-radius: 50%;
 border: 1px solid #ece9ce;
 position: absolute;
 bottom: -10px;
 left: 0;
`;

const Button = styled.button`
 position: absolute;
 top: 5px;
 right: -10px;
 width: 20px;
 height: 20px;
 display: flex;
 align-items: center;
 justify-content: center;
`;

const Background = styled.div`
 background: rgba(0, 0, 0, 0.605);
 width: 100%;
 height: 100%;
`;

interface ICard {
 _id: string;
 url: string;
 name: string;
}

interface ICardState {
 have_damaged: number | null;
 poison: number | null;
 blood: number | null;
 armor: number | null;
 stack: number | null;
 fire: number | null;
 closed: boolean | string;
 step_over: boolean;
 step_skip: boolean;
}

interface ICardTable {
 _id: number;
 isEmpty: boolean;
 user: string;
 card?: ICard | null;
 card_state?: ICardState | null;
}

interface ICardProps {
 item: ICardTable;
}

const Card: React.FC<ICardProps> = ({ item }) => {
 const [isOpen, setIsOpen] = useState(false);
 const [isZoom, setIsZoom] = useState(false);
 const dropdownRef = useRef<HTMLDivElement>(null);
 const cardRef = useRef<HTMLDivElement>(null);

 // Переключаем состояние Zoom
 const handleIsZoom = () => {
  if (!item.isEmpty) setIsZoom((prevZoom) => !prevZoom);
 };

 // Открытие/закрытие меню
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
   if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
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
   $empty={item.isEmpty}
   $user={item.user}
   id={item._id.toString()}
   $isZoom={!item.isEmpty && isZoom}
   onClick={handleIsZoom}
   ref={cardRef}
  >
   {!item.isEmpty && (
    <>
     {item.user === sessionStorage.getItem("player") ||
     !item.card_state?.closed ? (
      <>
       <Image
        src={item.card?.url}
        alt={item.card?.name}
        $step_over={item.card_state?.step_over}
        loading="lazy"
       />
       <SideStatus item={item} />
      </>
     ) : (
      <Image src="/image/t_shirt.jpg" alt="Closed card" />
     )}
     {!isOpen && <Button onClick={toggleDropDown}>+</Button>}
     {isOpen && <Button onClick={() => setIsOpen(false)}>+</Button>}
     {isOpen && <DropMenu item={item} ref={dropdownRef} />}
     {item.card_state?.closed && (
      <ImageEye src="/image/misc/eye.jpg" alt="eye" />
     )}
    </>
   )}
   {item.isEmpty && <Background />}
  </Component>
 );
};

export default Card;
