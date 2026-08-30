import styled from "styled-components";
import { useState } from "react";
import { BattlesDice } from "./BattlesDice";
import { Coins } from "./Coins";
import { Position } from "./Position";
import { HeaderRules } from "./HeaderRules";

const ComponentStyle = styled.div`
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
];

export const DropRules = () => {
  const [componentName, setComponentName] = useState<string | null>(null);

  const handleToggle = (name: string | null) => {
    setComponentName((prev) => (prev === name ? null : name));
  };

  return (
    <ComponentStyle>
      {components.map(({ name, Component, title }) => (
        <DropItemStyle key={name}>
          <HeaderRules
            title={title}
            componentName={componentName}
            onClick={() => handleToggle(name)}
          />
          <Component componentName={componentName === name} />
        </DropItemStyle>
      ))}
    </ComponentStyle>
  );
};
