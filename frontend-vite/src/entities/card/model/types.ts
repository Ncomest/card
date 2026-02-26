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

export interface ICardProps {
  item: ICardTable;
  index: number;
}
