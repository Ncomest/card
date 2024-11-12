import styled from "styled-components";
import Text from "./text/text";
import { glossary } from "../../data/glossary/glossary";
import { StyledButton } from "../../style/global.style";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import React, { useState } from "react";

const Container = styled.div``;

const Component = styled.div`
  background-color: #0b0b0b;
  background-image: url("/image/bg_paper.jpg");
  background-position: center;
  color: #bebebe;
  padding: 100px;
  font-family: "Cinzel", serif;
  display: inline-flex;
  gap: 15px;
  flex-direction: column;
`;

const Header = styled.div`
  text-align: center;
  background-color: #0b0b0b;
`;

const H2 = styled.h2`
  font-family: "Cinzel", serif;
  color: #bebebe;
  font-size: 54px;
  font-weight: 600;
`;

const Span = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled(StyledButton)``;

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
    <Container>
      <Header id="header">
        <H2>Глоссарий</H2>
        <Button onClick={handleToggle}>
          <Span>
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
          </Span>
        </Button>
      </Header>
      {isOpen && (
        <Component>
          {glossary.map((item, index) => (
            <Text key={index} title={item.title} text={item.text} />
          ))}
        </Component>
      )}
    </Container>
  );
};

export default Rules;
