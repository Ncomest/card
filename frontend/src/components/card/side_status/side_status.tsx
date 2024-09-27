import styled from "styled-components";
import { GiBloodyStash } from "react-icons/gi";

const Component = styled.div`
 padding: 2px;
 background-color: white;
 color: black;
 border: 1px solid;
 border-radius: 5px;
 position: absolute;
 display: flex;
 top: 30px;
 right: -16px;
 gap: 5px;
`;
function SideStatus() {
 return (
  <Component>
   <GiBloodyStash />: 5
  </Component>
 );
}

export default SideStatus;
