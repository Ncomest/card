import { fetchApi } from "@/shared/api";

export const getPlayerStatus = async () => {
  return await fetchApi({ API_URI: "/api/player" });
};

export const selectPlayer = async (player: string) => {
  return await fetchApi({
    API_URI: "/api/select-player",
    method: "POST",
    body: { player },
  });
};

export const resetPlayers = async () => {
  return await fetchApi({ API_URI: "/api/select-player" });
};
