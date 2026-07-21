import { useEffect, useState} from "react";
import { subscribeWs } from "@/shared/api";

type TRoll = {
  diceWhite: number;
  diceBlack: number;
};

export const useDiceRoll = () => {
  const [roll, setRoll] = useState<TRoll | null>(null);
  const [rollingPlayer, setRollingPlayer] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeRolling = subscribeWs<{ user: string }>(
      "dice:rolling",
      ({ user }) => {
        setRollingPlayer(user);
      },
    );

    const unsubscribeUpdate = subscribeWs<{ user: string; diceRoll: TRoll }>(
      "dice:update",
      ({ diceRoll }) => {
        setRoll(diceRoll);
        setRollingPlayer(null);
      },
    );

    return () => {
      unsubscribeRolling();
      unsubscribeUpdate();
    };
  }, []);

  const isRollingWhite = rollingPlayer === "player1";
  const isRollingBlack = rollingPlayer === "player2";

  return {
    roll,
    rollingPlayer,
    isRollingWhite,
    isRollingBlack,
  };
};
