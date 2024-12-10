import { useEffect, useState } from "react";
import styled from "styled-components";
import { site } from "../../site_state";
import { StyledButton } from "../../style/global.style";
import axios from "axios";

const Component = styled.div`
  text-align: center;
  padding: 10px 0;
  background-color: #0b0b0b;
  color: #ffeecd;
`;

const Button = styled(StyledButton)``;

function SelectPlayer() {
  const [isSelectPlayer, setIsSelectPlayer] = useState<string | null>(
    sessionStorage.getItem("player")
  );

  const [isPlayer, setIsPlayer] = useState({ player1: false, player2: false });

  const apiUrl = site;

  //Get players status
  useEffect(() => {
    const fetchPlayerStatus = async () => {
      try {
        const res = await fetch(apiUrl + "/api/player", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const data = await res.json();
        setIsPlayer(data);
      } catch (error) {
        console.error("Ошибка при получении статуса:", error);
      }
    };

    fetchPlayerStatus();
  }, [apiUrl]);

  //POST req to select a player
  const handleSelectPlayer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectPlayer = (e.currentTarget as HTMLButtonElement).value;
    console.log("selectPlayer", selectPlayer);

    try {
      const res = await axios.post(
        apiUrl + "/api/select-player",
        { player: selectPlayer },
        { withCredentials: true }
      );

      setIsPlayer(res.data);
      sessionStorage.setItem("player", selectPlayer);
      setIsSelectPlayer(selectPlayer);
    } catch (error) {
      console.error("Ошибка при выборе игрока", error);
    }
  };

  //Refresh players status
  const handleRefresh = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(apiUrl + "/api/select-player", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data, "refresh");
      setIsPlayer(data);
      sessionStorage.removeItem("player");
      setIsSelectPlayer(null);
    } catch (error) {
      console.error("Ошибка при сбросе игроков:", error);
    }
  };

  return (
    <Component>
      {isPlayer.player1 ? <p>Стас уже выбран</p> : <p>Стас свободен</p>}
      {isPlayer.player2 ? <p>Игорь уже выбран</p> : <p>Игорь свободен</p>}

      {!isSelectPlayer && !isPlayer.player1 && (
        <Button onClick={handleSelectPlayer} value={"player1"}>
          <span>Стас</span>
        </Button>
      )}

      {!isSelectPlayer && !isPlayer.player2 && (
        <Button onClick={handleSelectPlayer} value={"player2"}>
          <span>Игорь</span>
        </Button>
      )}

      <Button onClick={handleRefresh}>
        <span>Сброс</span>
      </Button>
    </Component>
  );
}

export default SelectPlayer;
