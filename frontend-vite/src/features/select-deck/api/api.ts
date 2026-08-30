import { fetchApi } from "@/shared/api";

export const getAllDecks = async (): Promise<string[]> => {
  return (await fetchApi({ API_URI: "/api/decks/all-deck" })) as string[];
};
