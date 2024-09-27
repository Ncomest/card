import { useState } from "react";
import styled from "styled-components";
import DropMenu from "./drop__menu/drop__menu";
import SideStatus from "./side_status/side_status";

const Component = styled.div`
 height: 320px;
 position: relative;
 &:hover {
  /* scale: 1.2; */
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

function Card() {
 const [isOpen, setIsOpen] = useState(false);

 return (
  <Component>
   <Image />
   <Button onClick={() => setIsOpen(!isOpen)}>+</Button>
   <SideStatus />
   {isOpen && <DropMenu />}
  </Component>
 );
}

export default Card;
