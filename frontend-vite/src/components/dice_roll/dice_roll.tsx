import { useEffect, useState } from "react";
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

import { StyledButton } from "@/style/global.style";
import { fetchApi } from "../../helper/fetchApi";
import { subscribeWs } from "@/api/wsClient";

const ComponentStyle = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: wheat;
`;

const ButtonStyle = styled(StyledButton)`
  height: 40px;
  font-size: 16px;
  margin: 5px 0;
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

type TRoll = {
  diceWhite: number;
  diceBlack: number;
};

const DiceRoll = () => {
  const [roll, setRoll] = useState<TRoll | null>(null);
  const [rollingPlayer, setRollingPlayer] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeRolling = subscribeWs<{ user: string }>(
      "dice:rolling",
      ({ user }) => {
        setRollingPlayer(user);
      }
    );

    const unsubscribeUpdate = subscribeWs<{ user: string; diceRoll: TRoll }>(
      "dice:update",
      ({ diceRoll }) => {
        setRoll(diceRoll);
        setRollingPlayer(null);
      }
    );

    return () => {
      unsubscribeRolling();
      unsubscribeUpdate();
    };
  }, []);

  const isRollingWhite = rollingPlayer === "player1";
  const isRollingBlack = rollingPlayer === "player2";

  const handleDiceRoll = () => {
    fetchApi({
      API_URI: "/api/dice",
      method: "PUT",
      body: { user: sessionStorage.getItem("player") },
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleRefreshStep = async () => {
    const data = await fetchApi({
      API_URI: "/api/table/refstep",
      method: "PUT",
      body: {
        user: sessionStorage.getItem("player"),
      },
    });

    if (data) console.log("data", data);

    // fetch(apiUrl + "/api/table/refstep", {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ user: sessionStorage.getItem("player") }),
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error(`Server error: ${res.status}`);
    //     }
    //     return res.json();
    //   })
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));
  };

  return (
    <ComponentStyle>
      <ButtonStyle onClick={handleDiceRoll}>
        <span>
          <FaDice />
        </span>
      </ButtonStyle>

      <PStyle>
        Стас:
        {isRollingWhite ? (
          <SpinnerStyle />
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
      </PStyle>
      <PStyle>
        Игорь:
        {isRollingBlack ? (
          <SpinnerStyle />
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
      </PStyle>
      <ButtonStyle onClick={handleRefreshStep}>
        <span>
          <IoRefreshCircleOutline />
        </span>
      </ButtonStyle>
    </ComponentStyle>
  );
};

export default DiceRoll;
