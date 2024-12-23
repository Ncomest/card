import styled from "styled-components";
import HeaderRules from "./header_rules.component";

interface IisOpen {
  title: string;
  isOpen: string | null | boolean;
}

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const H4 = styled.h4`
  color: #bebebe;
  font-size: 18px;
`;

const P = styled.p`
  color: #bebebe;
`;

const Coins = ({ isOpen, title }: IisOpen) => {
  return (
    <div>
      <HeaderRules title={title} isOpen={isOpen} />
      <div style={{ display: isOpen ? "block" : "none" }}>
        <Image src="/image/rules/card_cost_table.png" alt="" />
        <H4>Влияние стихий на набор отряда</H4>
        <P>
          Если в отряде больше одной стихии (нейтралы – не стихия), за каждую
          дополнительную стихию игрок получает штраф в 1 . При наборе отряда
          только из нейтральных карт у Первого игрока будет 24 и 22 .
          Мультистихийные карты дают штраф за каждую из своих стихий
        </P>
      </div>
    </div>
  );
};

export default Coins;
