import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&display=swap');

  body {
    font-family: 'Cinzel', serif;
  }
`;

export const StyledButton = styled.button`
 font-family: "Cinzel", serif;
 font-size: 18px;
 text-transform: uppercase;
 position: relative;
 display: inline-block;
 margin: 10px;
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
