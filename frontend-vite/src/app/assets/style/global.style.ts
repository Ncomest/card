import { createGlobalStyle } from "styled-components";

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

