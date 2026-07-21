import styled, { keyframes } from "styled-components";
import { FaDiceD20 } from "react-icons/fa";
import { FaDice } from "react-icons/fa6";
import { IoRefreshCircleOutline } from "react-icons/io5";
import { Button } from "@/shared/ui/button";
import {
  BsDice1,
  BsDice2,
  BsDice3,
  BsDice4,
  BsDice5,
  BsDice6,
  BsDice1Fill,
  BsDice2Fill,
  BsDice3Fill,
  BsDice4Fill,
  BsDice5Fill,
  BsDice6Fill,
} from "react-icons/bs";
import type { JSX } from "react";
import { getRoll, refreshStep, useDiceRoll } from "@/features/dice_roll";

const ComponentStyle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: wheat;
`;

const PStyle = styled.p`
  align-items: center;
  gap: 4px;
  display: flex;
`;

const spinStyle = keyframes`
 0% {transform: rotate(0deg);}
 100% {transform: rotate(360deg);}
`;

const SpinnerStyle = styled(FaDiceD20)`
  font-size: 26px;
  margin: auto;
  animation: ${spinStyle} 2s linear infinite;
`;

export const WDiceRoll = () => {
  const { roll, isRollingWhite, isRollingBlack } = useDiceRoll();

  const diceComponents = {
    1: BsDice1,
    2: BsDice2,
    3: BsDice3,
    4: BsDice4,
    5: BsDice5,
    6: BsDice6,
  };

  const diceComponentsFill = {
    1: BsDice1Fill,
    2: BsDice2Fill,
    3: BsDice3Fill,
    4: BsDice4Fill,
    5: BsDice5Fill,
    6: BsDice6Fill,
  };

  const whiteDiceRoll = (number: number | undefined): JSX.Element => {
    const DiceComponent = diceComponents[number as keyof typeof diceComponents];
    return DiceComponent ? <DiceComponent size={26} /> : <></>;
  };

  const blackDiceRoll = (number: number | undefined): JSX.Element => {
    const DiceComponent =
      diceComponentsFill[number as keyof typeof diceComponentsFill];
    return DiceComponent ? <DiceComponent size={26} /> : <></>;
  };

  return (
    <ComponentStyle>
      <Button type="game" size="xl" onClick={getRoll}>
        <FaDice />
      </Button>

      <PStyle>
        Стас:
        {isRollingWhite ? <SpinnerStyle /> : whiteDiceRoll(roll?.diceWhite)}
      </PStyle>

      <PStyle>
        Игорь:
        {isRollingBlack ? <SpinnerStyle /> : blackDiceRoll(roll?.diceBlack)}
      </PStyle>

      <Button type="game" size="xl" onClick={refreshStep}>
        <IoRefreshCircleOutline />
      </Button>
    </ComponentStyle>
  );
};