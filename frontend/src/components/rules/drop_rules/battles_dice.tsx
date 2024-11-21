import styled from "styled-components";
import HeaderRules from "./header_rules.component";
// import { cardSize } from "../../style/global.style";
import { cardSize } from "../../../style/global.style";

const Component = styled.div`
  text-align: center;
`;

const ImgContainer = styled(cardSize)`
  width: 100%;
  max-width: 400px;
  height: 460px;
  margin: 0 auto;

  @media (max-width: 1920px) {
    height: 400px;
  }
  @media (max-width: 1440px) {
    height: 320px;
  }
  @media (max-width: 1024px) {
    height: 240px;
  }
  @media (max-width: 768px) {
    height: 180px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const BattlesDice = ({ isOpen, title }: any) => {
  return (
    <div>
      <HeaderRules title={title} isOpen={isOpen} />
      <Component style={{ display: isOpen ? "block" : "none" }}>
        <ImgContainer>
          <Image
            src="/image/rules/battle_dice_roll.png"
            alt="таблица сражения (кубик)"
          />{" "}
          {/*временная заглушка*/}
        </ImgContainer>
      </Component>
    </div>
  );
};

export default BattlesDice;
