import { useEffect, useState } from "react";

function SelectPlayer() {
 const [isSelectPlayer, setIsSelectPlayer] = useState(sessionStorage.getItem("player"));
 const [isPlayer, setIsPlayer] = useState({ player1: false, player2: false });

 //POST select player
 const handleSelectPlayer = (e: any) => {
  const selectPlayer = e.target.value;
  fetch("http://localhost:4000/api/select-player", {
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
  fetch("http://localhost:4000/api/select-player", {
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
  fetch("http://localhost:4000/api/player")
   .then((res) => res.json())
   .then((res) => setIsPlayer(res))
   .catch((error) => console.log(error));
 }, []);

 return (
  <>
   {isPlayer.player1 === false ? (<p>Player 1 свободен</p>) : (<p>Pl уже выбран</p>)}
   {isPlayer.player2 === false ? (<p>Player 2 свободен</p>) : (<p>P2 уже выбран</p>)}

   {!isSelectPlayer && isPlayer.player1 === false && (
    <button onClick={handleSelectPlayer} value={"player1"}>
     SelectP1
    </button>
   )}

   {!isSelectPlayer && isPlayer.player2 === false && (
    <button onClick={handleSelectPlayer} value={"player2"}>
     SelectP2
    </button>
   )}
   
   <button onClick={handleRefresh}>Refresh</button>
  </>
 );
}

export default SelectPlayer;
