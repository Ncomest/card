import { useEffect, useState } from "react";
import { site } from "../../site_state.js";
import styled, { keyframes } from "styled-components";

import { FaDiceD20 } from "react-icons/fa";
//white
import { BsDice1 } from "react-icons/bs";
import { BsDice2 } from "react-icons/bs";
import { BsDice3 } from "react-icons/bs";
import { BsDice4 } from "react-icons/bs";
import { BsDice5 } from "react-icons/bs";
import { BsDice6 } from "react-icons/bs";
//black
import { BsDice1Fill } from "react-icons/bs";
import { BsDice2Fill } from "react-icons/bs";
import { BsDice3Fill } from "react-icons/bs";
import { BsDice4Fill } from "react-icons/bs";
import { BsDice5Fill } from "react-icons/bs";
import { BsDice6Fill } from "react-icons/bs";

const Component = styled.div`
 text-align: center;
 position: absolute;
 top: 50%;
 left: 5px;
 display: flex;
 flex-direction: column;
 gap: 10px;
 margin: 0 auto;
 color: wheat;
`;
const Button = styled.button`
 padding: 10px 20px;
 text-align: center;
 transition: 0.5s;
 background-size: 200% auto;
 color: white;
 box-shadow: 0 0 20px #2c2370;
 border-radius: 5px;
 background-image: linear-gradient(
  to right,
  #003cc5 0%,
  #0b63f6 51%,
  #003cc5 100%
 );
 &:hover {
  background-position: right center;
 }
`;

const P = styled.p`
 display: flex;
 gap: 5px;
 font-size: 24px;
`;

const spin = keyframes`
 0% {transform: rotate(0deg);}
 100% {transform: rotate(360deg);}
`;

const Spinner = styled(FaDiceD20)`
 margin: auto;
 animation: ${spin} 2s linear infinite;
 font-size: 40px;
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
  const interval = setInterval(() => {
   fetch(apiUrl + "/api/dice")
    .then((res) => res.json())
    .then((res) => setRoll(res))
    .catch((err) => console.log(err));
  }, 6000);

  return () => clearInterval(interval);
 }, [apiUrl]);

 const handleDiceRoll = () => {
  fetch(apiUrl + "/api/dice", {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ user: sessionStorage.getItem("player") }),
  })
   .then((res) => res.json())
   .then((res) => {
    setIsRolling(true);

    setTimeout(() => {
     setRoll(res);
     setIsRolling(false);
    }, 3000);
   })
   .catch((err) => console.log(err));
 };

 const handleRefreshStep = () => {
  fetch(apiUrl+"/api/table/refstep", {
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
   {isRolling ? <Spinner /> : <Button onClick={handleDiceRoll}>roll</Button>}
   <P>
    Игрок 1:
    {roll?.diceWhite === 1 && <BsDice1 />}
    {roll?.diceWhite === 2 && <BsDice2 />}
    {roll?.diceWhite === 3 && <BsDice3 />}
    {roll?.diceWhite === 4 && <BsDice4 />}
    {roll?.diceWhite === 5 && <BsDice5 />}
    {roll?.diceWhite === 6 && <BsDice6 />}
   </P>
   <P>
    Игрок 2:
    {roll?.diceBlack === 1 && <BsDice1Fill />}
    {roll?.diceBlack === 2 && <BsDice2Fill />}
    {roll?.diceBlack === 3 && <BsDice3Fill />}
    {roll?.diceBlack === 4 && <BsDice4Fill />}
    {roll?.diceBlack === 5 && <BsDice5Fill />}
    {roll?.diceBlack === 6 && <BsDice6Fill />}
   </P>
   <Button onClick={handleRefreshStep}>
    Обновить ход {sessionStorage.getItem("player")}
   </Button>
  </Component>
 );
};

export default DiceRoll;
