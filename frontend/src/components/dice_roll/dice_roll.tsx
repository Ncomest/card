import { useEffect, useState } from "react";
import { site } from "../../site_state.js";
import styled, { keyframes } from "styled-components";

import { FaDiceD20 } from "react-icons/fa";
import { FaDice } from "react-icons/fa6";
import { IoRefreshCircleOutline } from "react-icons/io5";

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

import { StyledButton } from "../../style/global.style.js";

const Component = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: wheat;
`;

const Button = styled(StyledButton)`
  height: 40px;
  font-size: 16px;
  margin: 5px 0;
`;

const P = styled.p`
  align-items: center;
  gap: 4px;
  display: flex;
`;

const spin = keyframes`
 0% {transform: rotate(0deg);}
 100% {transform: rotate(360deg);}
`;

const Spinner = styled(FaDiceD20)`
  font-size: 26px;
  margin: auto;
  animation: ${spin} 2s linear infinite;
`;

interface IRoll {
  diceWhite: number;
  diceBlack: number;
}

const DiceRoll: React.FC = () => {
  const apiUrl = site;

  const [roll, setRoll] = useState<IRoll | null>(null);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  useEffect(() => {
    const pullDiceRoll = () => {
      fetch(apiUrl + "/api/dice/wait", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => {
          if (data.rolling) {
            setIsRolling(true);

            setTimeout(() => {
              setIsRolling(false);
            }, 3000);
          }

          setRoll(data);
          pullDiceRoll();
        })
        .catch((err) => {
          console.error("Error in pulling", err);
          setTimeout(pullDiceRoll, 1000);
        });
    };

    pullDiceRoll();
  }, [apiUrl]);

  const handleDiceRoll = () => {
    setIsRolling(true);
    fetch(apiUrl + "/api/dice", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: sessionStorage.getItem("player") }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.rolling) {
          setIsRolling(true);

          setTimeout(() => {
            setRoll(res);
            setIsRolling(false);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRolling(false);
      });
  };

  const handleRefreshStep = () => {
    fetch(apiUrl + "/api/table/refstep", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: sessionStorage.getItem("player") }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <Component>
      <Button onClick={handleDiceRoll}>
        <span>
          <FaDice />
        </span>
      </Button>

      <P>
        Стас:
        {isRolling ? (
          <Spinner />
        ) : (
          <>
            {roll?.diceWhite === 1 && <BsDice1 size={26} />}
            {roll?.diceWhite === 2 && <BsDice2 size={26} />}
            {roll?.diceWhite === 3 && <BsDice3 size={26} />}
            {roll?.diceWhite === 4 && <BsDice4 size={26} />}
            {roll?.diceWhite === 5 && <BsDice5 size={26} />}
            {roll?.diceWhite === 6 && <BsDice6 size={26} />}
          </>
        )}
      </P>
      <P>
        Игорь:
        {isRolling ? (
          <Spinner />
        ) : (
          <>
            {roll?.diceBlack === 1 && <BsDice1Fill size={26} />}
            {roll?.diceBlack === 2 && <BsDice2Fill size={26} />}
            {roll?.diceBlack === 3 && <BsDice3Fill size={26} />}
            {roll?.diceBlack === 4 && <BsDice4Fill size={26} />}
            {roll?.diceBlack === 5 && <BsDice5Fill size={26} />}
            {roll?.diceBlack === 6 && <BsDice6Fill size={26} />}
          </>
        )}
      </P>
      <Button onClick={handleRefreshStep}>
        <span>
          <IoRefreshCircleOutline />
        </span>
      </Button>
    </Component>
  );
};

export default DiceRoll;
