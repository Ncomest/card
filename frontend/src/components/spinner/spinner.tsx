import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

const Component = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  height: 100vh;
`;

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Spinner() {
  return (
    <Component>
      <ClipLoader
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Component>
  );
}

export default Spinner;
