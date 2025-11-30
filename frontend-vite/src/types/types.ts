export interface ICard {
  _id: string;
  coin: string;
  element: string;
  part: string;
  type: string;
  uri: string;
  name: string;
}

export interface ICardState {
  have_damaged: number | null;
  poison: number | null;
  blood: number | null;
  armor: number | null;
  stack: number | null;
  fire: number | null;
  closed: boolean;
  step_over: boolean;
  step_skip: boolean;
}

export interface ICardTable {
  _id: number;
  isEmpty: boolean;
  user: string;
  card?: ICard | null;
  card_state?: ICardState | null;
}

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