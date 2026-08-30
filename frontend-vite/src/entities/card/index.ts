export { Card } from "./ui/Card";
export { default as DropMenu } from "./ui/drop_menu/DropMenu";
export { default as SideStatus } from "./ui/side_status/SideStatus";
export { SideStatusState } from "./ui/side_status_state/SideStatusState";
export { LineStatusState } from "./ui/drop_menu/LineStatusState";
export {
  getDataTable,
  getTableBox,
  moveCardTableToTable,
  clearTableBox,
  moveCardHandToTable,
} from "./api/tableApi";

export type {
  ICard,
  ICardState,
  ICardTable,
  ICardProps,
  ICardsTotal,
} from "./model/types";
