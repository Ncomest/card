import { fetchApi } from "@/shared/api";
import type { ICard, ICardTable } from "@/entities/card";

export const selectCurrentDeck = async () => {
  const data = await fetchApi({
    API_URI: "/api/hand/current-deck",
    method: "POST",
    body: {
      user: sessionStorage.getItem("player"),
      deckName: localStorage.getItem("deckName"),
    },
  });

  return data;
};

export const getRandomDeck = async () => {
  const data = await fetchApi({
    API_URI: "/api/hand/random",
    method: "POST",
    body: {
      user: sessionStorage.getItem("player"),
    },
  });
  return data;
};

export const clearPlayerHand = async () => {
  const data = await fetchApi({
    API_URI: "/api/hand/refresh",
    method: "PUT",
    body: { user: sessionStorage.getItem("player") },
  });

  return data;
};

export const getHand = async (user: string | null): Promise<ICard[]> => {
  return (await fetchApi({
    API_URI: "/api/hand",
    method: "POST",
    body: { user },
  })) as ICard[];
};

export const addCardToHand = async (
  user: string | null,
  card: ICardTable["card"],
): Promise<ICard[]> => {
  return (await fetchApi({
    API_URI: "/api/hand/update",
    method: "PUT",
    body: { user, card },
  })) as ICard[];
};

export const removeCardFromHand = async (
  user: string | null,
  cardIndex: number,
): Promise<ICard[]> => {
  return (await fetchApi({
    API_URI: "/api/hand/filter",
    method: "PUT",
    body: { user, cardIndex },
  })) as ICard[];
};
