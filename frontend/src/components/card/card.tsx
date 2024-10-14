import { useState } from "react";
import styled from "styled-components";
import DropMenu from "./drop__menu/drop__menu";
import SideStatus from "./side_status/side_status";

const Component = styled.div<{ $empty?: boolean }>`
 height: 160px;
 position: relative;
 border: 1px solid #fff;
 border-radius: 5px;
 transition: transform 0.3s ease;
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
  <Component $empty={!item.isEmpty} id={item._id}>
   {!item.isEmpty && (
    <>
     {/* <p>{item.card_state.blood}</p> */}
     <Image src={item.card.url} alt={item.card.name} loading="lazy" />
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
