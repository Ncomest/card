import styled from "styled-components";
import HeaderRules from "./header_rules.component";

const Component = styled.div`
  text-align: center;
`;
const Image = styled.img`
  width: 90%;
  margin: 0 auto;
  height: 100%;
`;

const BattlesDice = ({ isOpen, title }: any) => {
  return (
    <div>
      <HeaderRules title={title} isOpen={isOpen} />
      <Component style={{ display: isOpen ? "block" : "none" }}>
        <Image src="/image/t_shirt.JPG" /> {/*временная заглушка*/}
      </Component>
    </div>
  );
};

export default BattlesDice;
