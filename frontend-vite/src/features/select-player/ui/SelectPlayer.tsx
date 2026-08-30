import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@/shared/ui/button";
import { getPlayerStatus, resetPlayers, selectPlayer } from "../api/api";

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

const NavStyled = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
`;

export const SelectPlayer = () => {
  const [isSelectPlayer, setIsSelectPlayer] = useState<string | null>(
    sessionStorage.getItem("player"),
  );

  const [isPlayer, setIsPlayer] = useState<Record<string, boolean>>({
    player1: false,
    player2: false,
  });

  useEffect(() => {
    const fetchPlayerStatus = async () => {
      try {
        const data = (await getPlayerStatus()) as Record<string, boolean>;
        setIsPlayer(data);
      } catch (error) {
        console.error("Ошибка при получении статуса:", error);
      }
    };

    fetchPlayerStatus();
  }, []);

  const handleSelectPlayer = async (player: string) => {
    try {
      const data = (await selectPlayer(player)) as Record<string, boolean>;
      setIsPlayer(data);
      sessionStorage.setItem("player", player);
      setIsSelectPlayer(player);
    } catch (error) {
      console.error("Ошибка при выборе игрока", error);
    }
  };

  const handleRefresh = async () => {
    try {
      const data = (await resetPlayers()) as Record<string, boolean>;
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

        <NavStyled>
          {!isSelectPlayer && !isPlayer.player1 && (
            <Button
              type="system"
              size="xl"
              onClick={() => handleSelectPlayer("player1")}
            >
              Стас
            </Button>
          )}

          {!isSelectPlayer && !isPlayer.player2 && (
            <Button
              type="system"
              size="xl"
              onClick={() => handleSelectPlayer("player2")}
            >
              Игорь
            </Button>
          )}

          <Button type="system" size="l" onClick={handleRefresh}>
            Сброс
          </Button>
        </NavStyled>
      </InnerStyle>
    </ComponentStyle>
  );
};
