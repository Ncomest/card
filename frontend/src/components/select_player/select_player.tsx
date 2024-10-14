import { useEffect, useState } from "react";
import styled from "styled-components";
import { site } from "../../site_state";

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
   .then(() => setIsSelectPlayer(selectPlayer))
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
  fetch(apiUrl +"/api/player")
   .then((res) => res.json())
   .then((res) => setIsPlayer(res))
   .catch((error) => console.log(error));
 }, []);

 return (
  <>
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
    <Button onClick={handleSelectPlayer} value={"player1"}>
     SelectP1
    </Button>
   )}

   {!isSelectPlayer && isPlayer.player2 === false && (
    <Button onClick={handleSelectPlayer} value={"player2"}>
     SelectP2
    </Button>
   )}

   <Button onClick={handleRefresh}>Refresh</Button>
  </>
 );
}

export default SelectPlayer;
