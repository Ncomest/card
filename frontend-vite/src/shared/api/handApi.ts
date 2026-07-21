import { fetchApi } from "@/shared/api/api";
import type { ICard, ICardTable } from "@/shared/lib/types/types";

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
