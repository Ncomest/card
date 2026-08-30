import styled from "styled-components";
import { GlossaryItem } from "./GlossaryItem";
import { glossary } from "../config/glossary";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useState } from "react";
import { Button } from "@/shared/ui/button";

const ContainerStyle = styled.div`
  background-color: var(--primary-color);
  padding: 10px 5px;
`;

const ComponentStyle = styled.div`
  background-color: #0b0b0b;
  background-image: url("/image/bg_paper.jpg");
  background-position: center;
  color: #bebebe;
  padding: 100px;
  font-family: "Cinzel", serif;
  display: inline-flex;
  gap: 15px;
  flex-direction: column;
  border-radius: 20px;
  margin: 10px 0;
`;

const HeaderStyle = styled.div`
  text-align: center;
  background-color: var(--secondary-color);
  border-radius: 5px;
  padding: 10px 0;
`;

const H2Style = styled.h2`
  font-family: "Cinzel", serif;
  color: #bebebe;
  font-size: 54px;
  font-weight: 600;
`;

export const Glossary = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    const head = document.getElementById("header");

    setTimeout(() => {
      if (head) {
        window.scrollTo({ top: head.offsetTop, behavior: "smooth" });
      }
    }, 200);
  };

  return (
    <ContainerStyle>
      <HeaderStyle id="header">
        <H2Style>Глоссарий</H2Style>
        <Button type="game" size="xl" onClick={handleToggle}>
          {isOpen ? (
            <>
              <MdKeyboardDoubleArrowUp color="#ce8d00" />
              Скрыть
              <MdKeyboardDoubleArrowUp color="#ce8d00" />
            </>
          ) : (
            <>
              <MdKeyboardDoubleArrowDown color="#ce8d00" />
              Показать
              <MdKeyboardDoubleArrowDown color="#ce8d00" />
            </>
          )}
        </Button>
      </HeaderStyle>
      {isOpen && (
        <ComponentStyle>
          {glossary.map(({ title, text, icons }, index) => (
            <GlossaryItem
              key={index}
              title={title}
              text={text}
              icons={icons}
            />
          ))}
        </ComponentStyle>
      )}
    </ContainerStyle>
  );
};
