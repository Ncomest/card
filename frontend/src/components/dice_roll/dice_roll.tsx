import { useEffect, useState } from "react";

import { site } from "../../site_state.js";

interface IRoll {
 diceWhite: number;
 diceBlack: number;
}

const DiceRoll = () => {
 const apiUrl = site;

 const [roll, setRoll] = useState<IRoll | null>(null);
 //отправляем запрос на сервер, передаем данные user: player1 or player2
 //принимаем и устанавливаем значение кубикаnee

 useEffect(() => {
  fetch(apiUrl + "/api/dice")
   .then((res) => res.json())
   .then((res) => setRoll(res))
   .catch((err) => console.log(err));
 }, []);

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
  <div>
   <button onClick={handleDiceRoll}>roll</button>
   <p>{roll?.diceWhite}</p>
   <p>{roll?.diceBlack}</p>
  </div>
 );
};

export default DiceRoll;
