import styled from "styled-components";
import HeaderRules from "./header_rules.component";
// import { cardSize } from "../../style/global.style";
import { cardSize } from "../../../style/global.style";

const Component = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const TextContainer = styled.div`
  text-align: left;
`;

const H4 = styled.h4`
  color: #bebebe;
  font-size: 18px;
  margin: 10px 0;
`;

const P = styled.p`
  color: #b3b3b3;
  margin: 5px 0;
`;

const Li = styled.li`
  color: #bebebe;
  list-style-position: inside;
`;

const BattlesDice = ({ isOpen }: any) => {
  return (
    <div>
      <Component style={{ display: isOpen ? "block" : "none" }}>
        <ImgContainer>
          <Image
            src="/image/rules/battle_dice_roll.png"
            alt="таблица сражения (кубик)"
          />{" "}
          {/*временная заглушка*/}
        </ImgContainer>
        <TextContainer>
          <P>Если у обоих игроков выпали одинаковые числа:</P>
          <P>
            1, 2, 3, 4 (или меньше, с учётом модификаторов) — нападающий наносит
            слабый удар.
          </P>
          <P>
            5, 6 (или больше, с учётом модификаторов) — отражающий наносит
            слабый удар.
          </P>
          <br />
          <H4>Атака по закрытой карте простым ударом</H4>
          <P>
            Если отражающее существо закрыто и ему не назначен защитник, оно не
            сражается (не бросает кубик). Кубик бросает только нападающий и в
            зависимости от результата (с учётом модификаторов) наносит цели
            удар:
          </P>
          <ul>
            <Li>3 или менее — нападающий наносит слабый удар;</Li>
            <Li>4, 5 — нападающий наносит средний удар;</Li>
            <Li>6 или более — нападающий наносит сильный удар.</Li>
          </ul>
          <P>
            Удары по закрытым картам всегда успешны, а открытые имеют шанс
            отбиться. Решение, кем атаковать, а кого оставить для защиты — один
            из важнейших тактических моментов в игре «Берсерк».
          </P>
        </TextContainer>
      </Component>
    </div>
  );
};

export default BattlesDice;
