import { useEffect, useState } from "react";
import styled from "styled-components";
import DropMenu from "./drop__menu/drop__menu";

const Component = styled.div`
 width: 240px;
 height: 320px;
 position: relative;
 &:hover {
  scale: 2;
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

function Card({ data }: any) {
 const [isOpen, setIsOpen] = useState(true);

 return (
  <Component>
   <Image src={data.url} alt={data.name} />
   {isOpen && <DropMenu />}
   <Button onClick={() => setIsOpen(!isOpen)}>+</Button>
  </Component>
 );
}

export default Card;
