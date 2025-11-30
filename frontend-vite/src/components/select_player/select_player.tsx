import { useEffect, useState } from "react";
import styled from "styled-components";
import { StyledButton } from "../../style/global.style";
import { fetchApi } from "../../helper/fetchApi";

const ComponentStyle = styled.div`
  text-align: center;
  padding: 10px 5px;
  background-color: var(--primary-color);
  color: #ffeecd;
`;

const InnerStyle = styled.div`
  background-color: var(--secondary-color);
  border-radius: 5px;
`;

const ButtonStyle = styled(StyledButton)`
  margin: 5px 10px;
`;

function SelectPlayer() {
  const [isSelectPlayer, setIsSelectPlayer] = useState<string | null>(
    sessionStorage.getItem("player")
  );

  const [isPlayer, setIsPlayer] = useState<any>({
    player1: false,
    player2: false,
  });

  //Get players status
  useEffect(() => {
    const fetchPlayerStatus = async () => {
      try {
        const data = await fetchApi({ API_URI: "/api/player" });
        setIsPlayer(data);
      } catch (error) {
        console.error("Ошибка при получении статуса:", error);
      }
    };

    fetchPlayerStatus();
  }, []);

  //POST req to select a player
  const handleSelectPlayer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const selectPlayer = (e.currentTarget as HTMLButtonElement).value;

    try {
      const data = await fetchApi({
        API_URI: "/api/select-player",
        method: "POST",
        body: { player: selectPlayer },
      });

      setIsPlayer(data);
      sessionStorage.setItem("player", selectPlayer);
      setIsSelectPlayer(selectPlayer);
    } catch (error) {
      console.error("Ошибка при выборе игрока", error);
    }
  };

  //Refresh players status
  const handleRefresh = async () => {
    try {
      const data = await fetchApi({ API_URI: "/api/select-player" });
      setIsPlayer(data);
      sessionStorage.removeItem("player");
      setIsSelectPlayer(null);
    } catch (error) {
      console.error("Ошибка при сбросе игроков:", error);
    }
  };

  return (
    <ComponentStyle>
      <InnerStyle>
        {isPlayer.player1 ? <p>Стас уже выбран</p> : <p>Стас свободен</p>}
        {isPlayer.player2 ? <p>Игорь уже выбран</p> : <p>Игорь свободен</p>}

        {!isSelectPlayer && !isPlayer.player1 && (
          <ButtonStyle onClick={handleSelectPlayer} value={"player1"}>
            <span>Стас</span>
          </ButtonStyle>
        )}

        {!isSelectPlayer && !isPlayer.player2 && (
          <ButtonStyle onClick={handleSelectPlayer} value={"player2"}>
            <span>Игорь</span>
          </ButtonStyle>
        )}

        <ButtonStyle onClick={handleRefresh}>
          <span>Сброс</span>
        </ButtonStyle>
      </InnerStyle>
    </ComponentStyle>
  );
}

export default SelectPlayer;
