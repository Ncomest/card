import styled from "styled-components";
import Helper from "./helper";
import Note from "./note";
import { useState } from "react";

const Comnponent = styled.div`
  flex: 1;
  padding: 10px;
  justify-content: center;
`;

const DropItem = styled.div`
  padding: 10px;
  background-color: #f4f4f4;
  margin: 5px 0;
  cursor: pointer;
  border: 1px solid #ccc;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 16px;
  color: #333;
`;

const components = [
  { name: "helper", Component: Helper, title: "подсказки" },
  { name: "note", Component: Note, title: "заметки" },
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
          <Title>{title}</Title>
          <Component isOpen={isOpen === name} />
        </DropItem>
      ))}
      <Helper />
      <Note />
    </Comnponent>
  );
};

export default DropRules;
