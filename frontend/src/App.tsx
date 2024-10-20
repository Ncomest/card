import styled from "styled-components";
import "./App.css";
import Home from "./pages/home/home";

const Component = styled.div`
 background: linear-gradient(25deg, #100a2b 40%, #060380);
`;

function App() {
 return (
  <Component>
   <Home />
  </Component>
 );
}

export default App;
