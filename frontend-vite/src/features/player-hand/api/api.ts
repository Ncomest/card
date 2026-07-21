import { fetchApi } from "@/shared/api";

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
