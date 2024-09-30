import styled from "styled-components";
// import Card from "../../components/card/card";

const Component = styled.div`
 border: 1px solid;
 height: 200px;
`;

function Table({ item }: any) {
 return (
  <Component>
   <p>{item._id}</p>
   <p>{item.isEmpty}</p>
  </Component>
 );
}

export default Table;
