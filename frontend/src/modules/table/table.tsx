import React from "react";
import styled from "styled-components";
import Card from "../../components/card/card";

const Component = styled.div`
 padding: 10px;
 display: grid;
 grid-template-columns: repeat(7, 1fr);
 grid-template-rows: repeat(3, 1fr);
 gap: 20px;
`;

const contTable = [
 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];

function Table(data: any) {
 return (
  <Component>
   {contTable.map((item) => (
    <Card />
   ))}
  </Component>
 );
}

export default Table;
