import { useEffect, useState } from "react";
import styled from "styled-components";
import { site } from "../../site_state";
import ButtonDarkStone from "../button/button_dark_stone";

const Component = styled.div`
 text-align: center;
 padding: 10px 0;
 background-color: #0b0b0b;
 color: #ffeecd;
`;


function SelectPlayer() {
 const [isSelectPlayer, setIsSelectPlayer] = useState(
  sessionStorage.getItem("player")
 );

 const [isPlayer, setIsPlayer] = useState({ player1: false, player2: false });

 const apiUrl = site;

 //POST select player
 const handleSelectPlayer = (e: any) => {
  const selectPlayer = e.target.value;
  fetch(apiUrl + "/api/select-player", {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ player: selectPlayer }),
  })
   .then((res) => res.json())
   .then((res) => setIsPlayer(res))
   .then(() => sessionStorage.setItem("player", selectPlayer))
   //  .then(() => setIsSelectPlayer(selectPlayer))
   .catch((err) => console.log("error", err));
 };

 //Refresh players status
 const handleRefresh = () => {
  fetch(apiUrl + "/api/select-player", {
   method: "PUT",
  })
   .then((res) => res.json())
   .then((res) => setIsPlayer(res))
   .then(() => delete sessionStorage.player)
   .then(() => setIsSelectPlayer(""))
   .catch((err) => console.log(err));
 };

 //Get players status
 useEffect(() => {
  fetch(apiUrl + "/api/player")
   .then((res) => res.json())
   .then((res) => setIsPlayer(res))
   .catch((error) => console.log(error));
 }, [apiUrl]);

 return (
  <Component>
   {isPlayer.player1 === false ? (
    <p>Player 1 свободен</p>
   ) : (
    <p>Pl уже выбран</p>
   )}
   {isPlayer.player2 === false ? (
    <p>Player 2 свободен</p>
   ) : (
    <p>P2 уже выбран</p>
   )}

   {!isSelectPlayer && isPlayer.player1 === false && (
     <ButtonDarkStone
     onClick={handleSelectPlayer}
     value={"player1"}
     text="Стас"
    />
   )}

   {!isSelectPlayer && isPlayer.player2 === false && (
    <ButtonDarkStone
     onClick={handleSelectPlayer}
     value={"player2"}
     text="Игорь"
    />
   )}

<ButtonDarkStone
     onClick={handleRefresh}
     text="Обнулить Игроков"
    />
  </Component>
 );
}

export default SelectPlayer;
