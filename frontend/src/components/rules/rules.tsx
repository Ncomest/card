import styled from "styled-components";
import Text from "./text/text";
import { glossary } from "../../data/glossary/glossary";
import { StyledButton } from "../../style/global.style";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import React, { useState } from "react";

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

const SpanStyle = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ButtonStyle = styled(StyledButton)``;

const Rules: React.FC = () => {
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
        <ButtonStyle onClick={handleToggle}>
          <SpanStyle>
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
          </SpanStyle>
        </ButtonStyle>
      </HeaderStyle>
      {isOpen && (
        <ComponentStyle>
          {glossary.map(({ title, text, icons }, index) => (
            <Text key={index} title={title} text={text} icons={icons} />
          ))}
        </ComponentStyle>
      )}
    </ContainerStyle>
  );
};

export default Rules;
