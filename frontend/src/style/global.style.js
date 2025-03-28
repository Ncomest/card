import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Cinzel', serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --primary-color: rgba(0, 0, 0, 0.9);
    --secondary-color: #303030;
  }
`;


export const StyledButton = styled.button`
  font-family: "Cinzel", serif;
  font-size: 18px;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  text-align: center;
  background: none;
  color: #a89c9c;
  border-radius: 5px;
  overflow: hidden;
  &:hover {
    scale: 1.1;
  }

  &:active {
    scale: 0.9;
  }

  &::before {
    background-image: url("/image/misc/button_dark.jpg");
    background-position: center;
    background-size: cover;
    filter: brightness(40%);
    z-index: 0;
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  span {
    position: relative;
  }
`;

export const cardSize = styled.div`
  height: 300px;

  @media (max-width: 1920px) {
    height: 200px;
  }
  @media (max-width: 1440px) {
    height: 160px;
  }
  @media (max-width: 1024px) {
    height: 120px;
  }
  @media (max-width: 768px) {
    height: 80px;
  }
`;
