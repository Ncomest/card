export type { ICard, ICardState, ICardTable, ICardProps } from "@/entities/card/model/types";
import type { ICard } from "@/entities/card/model/types";

export interface ICardsTotal {
  cards: ICard[];
  page?: string;
  pages?: string;
  total?: string;
};

export interface IDrag {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  e?: any;
  casePickTableId?: number;
  casePutTableId?: number;
  cardId?: string | null;
  placePickCard?: string;
  placePutCard?: string;
  cardIndex?: number;
}

export interface IFetch {
  API_URI: string;
  method?: string;
  bearer?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any;
}

