import styled from "styled-components";
import { ReactNode } from "react";
import { GiBloodyStash } from "react-icons/gi";

const Component = styled.div`
 background-color: white;
 position: absolute;
 top: 25px;
 right: -20px;
 border: 1px solid;
`;

const Ul = styled.ul`
 padding: 5px 10px;
`;

function DropMenu() {
 return (
  <Component>
   <Ul>
    <List icon={<GiBloodyStash />} title="Blood" number={5} inputs="null" />
    {/* <Li>Броня</Li> */}
   </Ul>
  </Component>
 );
}

export default DropMenu;

interface IList {
 icon: ReactNode;
 title: string;
 number: number;
 inputs: number | string;
}

const Li = styled.li`
 list-style: none;
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 5px;
`;

const Icon = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 width: 15px;
 height: 15px;
`;

const Input = styled.input`
 max-width: 100px;
 width: 50px;
`;
const Button = styled.button`
 display: flex;
 align-items: center;
 justify-content: center;
 width: 20px;
 height: 20px;
`;

function List({ icon, title, number, inputs }: IList) {
 return (
  <Li>
   <Icon>{icon}</Icon>
   <p>{title}:</p>
   <p>{number}</p>
   <Input />
   <Button>+</Button>
  </Li>
 );
}
