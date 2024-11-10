import styled from "styled-components";
import { useState } from "react";
import Note from "./note";
import BattlesDice from "./battles_dice";
import Coins from "./coins";
import Position from "./position";

const Comnponent = styled.div`
  overflow-y: scroll;
  scrollbar-color: #bebebe #000;
  scrollbar-width: none;
  padding: 10px;
  flex: 1;
`;

const DropItem = styled.div`
  padding: 5px 10px;
  background-color: #242424ab;
  border-radius: 5px;
  margin: 5px 0;
  cursor: pointer;
  border: 1px solid #ccc;

  &:hover {
    background-color: #626262c3;
  }
`;

const components = [
  { name: "coins", Component: Coins, title: "Монетки" },
  { name: "battles", Component: BattlesDice, title: "Сражение и броски" },
  { name: "position", Component: Position, title: "Позициониравние и атаки" },
  // { name: "note", Component: Note, title: "Заметки" },
];

const DropRules = () => {
  const [isOpen, setIsOpen] = useState(null);

  const handleToggle = (componentName: any) => {
    setIsOpen((prev) => (prev === componentName ? null : componentName));
  };

  return (
    <Comnponent>
      {components.map(({ name, Component, title }) => (
        <DropItem key={name} onClick={() => handleToggle(name)}>
          <Component isOpen={isOpen === name} title={title} />
        </DropItem>
      ))}
    </Comnponent>
  );
};

export default DropRules;
