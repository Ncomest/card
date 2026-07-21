import { fetchApi, getDataTable } from "@/shared/api/api";
import type { ICardTable } from "@/shared/lib/types/types";

export { getDataTable };

export const getTableBox = async (id: number): Promise<ICardTable> => {
  return (await fetchApi({ API_URI: `/api/table/${id}` })) as ICardTable;
};

interface MoveCardOnTableParams {
  casePutTableId: number;
  casePickTableId: number;
  card: ICardTable["card"];
  card_state: ICardTable["card_state"];
  user: string | null;
}

export const moveCardTableToTable = async (
  params: MoveCardOnTableParams,
): Promise<ICardTable[]> => {
  return (await fetchApi({
    API_URI: `/api/table/${params.casePutTableId}`,
    method: "PUT",
    body: {
      placePickCard: "table",
      placePutCard: "table",
      casePickTableId: params.casePickTableId,
      casePutTableId: params.casePutTableId,
      card: params.card,
      card_state: params.card_state,
      isEmpty: false,
      user: params.user,
    },
  })) as ICardTable[];
};

interface ClearTableBoxParams {
  casePickTableId: number;
  casePutTableId: number;
}

export const clearTableBox = async (
  params: ClearTableBoxParams,
): Promise<ICardTable[]> => {
  return (await fetchApi({
    API_URI: `/api/table/${params.casePickTableId}`,
    method: "PUT",
    body: {
      placePickCard: "table",
      placePutCard: "hand",
      casePickTableId: params.casePickTableId,
      casePutTableId: params.casePutTableId,
      isEmpty: true,
    },
  })) as ICardTable[];
};

interface MoveCardHandToTableParams {
  casePutTableId: number;
  casePickTableId: number;
  card: ICardTable["card"];
  user: string | null;
}

export const moveCardHandToTable = async (
  params: MoveCardHandToTableParams,
): Promise<ICardTable[]> => {
  return (await fetchApi({
    API_URI: `/api/table/${params.casePutTableId}`,
    method: "PUT",
    body: {
      placePickCard: "hand",
      placePutCard: "table",
      casePickTableId: params.casePickTableId,
      casePutTableId: params.casePutTableId,
      card: params.card,
      isEmpty: false,
      user: params.user,
    },
  })) as ICardTable[];
};
