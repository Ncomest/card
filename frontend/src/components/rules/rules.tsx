import styled from "styled-components";
import Text from "./text/text";
import { GiBatteredAxe } from "react-icons/gi";
import { glossary } from "../../data/glossary/glossary";

const Component = styled.div`
  background-color: #0b0b0b;
  background-image: url("/image/bg_paper.jpg");
  /* background-repeat: no-repeat; */
  /* background-size: cover; */
  background-position: center;
  color: #bebebe;
  padding: 100px;
  font-family: "Cinzel", serif;
  display: inline-flex;
  gap: 15px;
  flex-direction: column;
`;

const Rules = () => {
  return (
    <Component>
      {glossary.map((item) => (
        <Text title={item.title} text={item.text} />
      ))}
    </Component>
  );
};

export default Rules;
