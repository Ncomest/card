import { useState } from "react";
import styled from "styled-components";
import DropMenu from "./drop__menu/drop__menu";
import SideStatus from "./side_status/side_status";

const Component = styled.div<{ $empty?: boolean; $user: string }>`
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

 &:hover {
  scale: ${(prop) => prop.$empty && 2.2};
  z-index: ${(prop) => prop.$empty && 1};
 }
`;

const Image = styled.img`
 width: 100%;
 height: 100%;
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

const Card = ({ item }: any) => {
 const [isOpen, setIsOpen] = useState(false);

 return (
  <Component $empty={!item.isEmpty} $user={item.user} id={item._id}>
   {!item.isEmpty && (
    <>
     <Image src={item?.card?.url} alt={item?.card?.name} loading="lazy" />
     <Button onClick={() => setIsOpen(!isOpen)}>+</Button>
     {!item.isEpmty && <SideStatus item={item} />}
     {isOpen && <DropMenu item={item} />}
    </>
   )}
   {item.isEmpty && <Background />}
  </Component>
 );
};

export default Card;
