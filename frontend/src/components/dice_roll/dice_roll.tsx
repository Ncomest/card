import { useEffect, useState } from "react";
import { site } from "../../site_state.js";
import styled from "styled-components";
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
 font-size: 24px;
`;

interface IRoll {
 diceWhite: number;
 diceBlack: number;
}

const DiceRoll = () => {
 const apiUrl = site;

 const [roll, setRoll] = useState<IRoll | null>(null);

 useEffect(() => {
  fetch(apiUrl + "/api/dice")
   .then((res) => res.json())
   .then((res) => setRoll(res))
   .catch((err) => console.log(err));
 }, [apiUrl]);

 const handleDiceRoll = () => {
  fetch(apiUrl + "/api/dice", {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ user: sessionStorage.getItem("player") }),
  })
   .then((res) => res.json())
   .then((res) => {
    //начать анимацию броска
    setTimeout(() => {
     setRoll(res);
    }, 3000);
    //закончить анимацию броска
   })
   .catch((err) => console.log(err));
 };

 return (
  <Component>
   <Button onClick={handleDiceRoll}>roll</Button>
   <P>Игрок 1 "белый кубик": {roll?.diceWhite}</P>
   <P>Игрок 2 "черный кубик": {roll?.diceBlack}</P>
  </Component>
 );
};

export default DiceRoll;
