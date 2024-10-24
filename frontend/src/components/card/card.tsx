import React, { useState } from "react";
import styled from "styled-components";
import DropMenu from "./drop__menu/drop__menu";
import SideStatus from "./side_status/side_status";
import { GoEyeClosed } from "react-icons/go";

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
    ? "#5bbed2"
    : prop.$user === "player2"
    ? "#ff00f3"
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
 background-image: url("/image/bg_t_shirt.png");
 background-repeat: no-repeat;
 background-position: center;
 width: 100%;
 height: 100%;
 filter: brightness(0.1) blur(2px) sepia(60%);
`;

const TshirtShow = styled.div`
 position: absolute;
 bottom: -10px;
 left: 0;
 color: red;
 font-size: 25px;
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
 const [isZoom, setIsZoom] = useState<boolean>(false);

 const handleIsZoom = () => {
  if (!item.isEmpty) {
   setIsZoom(!isZoom);
  }
 };

 return (
  <Component
   $empty={!item.isEmpty}
   $user={item.user}
   id={item._id.toString()}
   $isZoom={!item.isEmpty && isZoom}
   onClick={handleIsZoom}
  >
   {!item.isEmpty && (
    <>
     {item.user === sessionStorage.getItem("player") ||
     !item.card_state?.closed ? (
      <>
       <Image
        src={item?.card?.url}
        alt={item?.card?.name}
        $step_over={item.card_state?.step_over}
        loading="lazy"
       />
       {!item.isEmpty && <SideStatus item={item} />}
      </>
     ) : (
      <Image src="/image/t_shirt.jpg" />
     )}
     <Button
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
       e.stopPropagation();
       setIsOpen(!isOpen);
      }}
     >
      +
     </Button>
     {isOpen && <DropMenu item={item} />}
     {item.card_state?.closed && (
      <TshirtShow>
       <GoEyeClosed />
      </TshirtShow>
     )}
    </>
   )}
   {item.isEmpty && <Background />}
  </Component>
 );
};

export default Card;
