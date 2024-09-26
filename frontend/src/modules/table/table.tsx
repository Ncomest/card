import React from "react";
import styled from "styled-components";

const Component = styled.div`
 display: grid;
 grid-template-columns: repeat(3);
 gap: 10px;
`;

const CardContainer = styled.div`
 background-color: aqua;
 width: 200px;
 height: 300px;
 border-color: 1px solid black;
`;

function Table(data: any) {
 return (
  <Component>
   {
    <CardContainer>
     <p>{data.id}</p>
    </CardContainer>
   }
  </Component>
 );
}

export default Table;
