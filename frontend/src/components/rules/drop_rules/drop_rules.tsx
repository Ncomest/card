import styled from "styled-components";
import { useState } from "react";
// import Note from "./note";
import BattlesDice from "./battles_dice";
import Coins from "./coins";
import Position from "./position";
import HeaderRules from "./header_rules.component";

const ComnponentStyle = styled.div`
  overflow-y: scroll;
  scrollbar-color: #bebebe #000;
  scrollbar-width: none;
  padding: 10px;
  flex: 1;
`;

const DropItemStyle = styled.div`
  padding: 5px 10px;
  background-color: #242424ab;
  border-radius: 5px;
  margin: 5px 0;
  border: 1px solid #ccc;
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
    <ComnponentStyle>
      {components.map(({ name, Component, title }) => (
        <DropItemStyle key={name} >
          <HeaderRules title={title} isOpen={isOpen} onClick={() => handleToggle(name)}/>
          <Component isOpen={isOpen === name} title={title} />
        </DropItemStyle>
      ))}
    </ComnponentStyle>
  );
};

export default DropRules;
