import { useRef } from "react";
import type { ICard, ICardTable } from "@/entities/card";
import {
  getTableBox,
  moveCardTableToTable,
  clearTableBox,
  moveCardHandToTable,
} from "@/entities/card";
import { addCardToHand, removeCardFromHand } from "@/features/player-hand";

interface UseDragAndDropParams {
  hand: ICard[];
  setTable: (table: ICardTable[]) => void;
  setHand: (hand: ICard[]) => void;
}

interface DragPayload {
  casePickTableId: number;
  placePickCard: string;
  cardIndex: number;
  cardId?: string;
}

export const useDragAndDrop = ({
  hand,
  setTable,
  setHand,
}: UseDragAndDropParams) => {
  const dragPayload = useRef<DragPayload | null>(null);

  const getPlayer = () => sessionStorage.getItem("player");

  const handleDragStart = ({
    e,
    casePickTableId,
    cardId,
    placePickCard,
    cardIndex,
  }: {
    e: React.DragEvent;
    casePickTableId?: number;
    cardId?: string | null;
    placePickCard?: string;
    cardIndex?: number;
  }) => {
    e.dataTransfer.setData("casePickTableId", String(casePickTableId ?? ""));
    e.dataTransfer.setData("placePickCard", placePickCard ?? "");
    e.dataTransfer.setData("cardIndex", String(cardIndex ?? ""));
    if (cardId) e.dataTransfer.setData("cardId", cardId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async ({
    e,
    casePutTableId,
    placePutCard,
  }: {
    e: React.DragEvent;
    casePutTableId?: number;
    placePutCard?: string;
  }) => {
    e.preventDefault();

    const casePickTableId = Number(e.dataTransfer.getData("casePickTableId"));
    const placePickCard = e.dataTransfer.getData("placePickCard");
    const cardIndex = e.dataTransfer.getData("cardIndex");

    if (casePickTableId === Number(casePutTableId)) return;

    await applyDrop({
      casePickTableId,
      casePutTableId: casePutTableId ?? 0,
      placePickCard,
      placePutCard: placePutCard ?? "",
      cardIndex: Number(cardIndex),
    });
  };

  const handleTouchStart = ({
    casePickTableId,
    cardId,
    placePickCard,
    cardIndex,
  }: {
    casePickTableId?: number;
    cardId?: string | null;
    placePickCard?: string;
    cardIndex?: number;
  }) => {
    dragPayload.current = {
      casePickTableId: casePickTableId ?? 0,
      placePickCard: placePickCard ?? "",
      cardIndex: cardIndex ?? 0,
      cardId: cardId ?? undefined,
    };
  };

  const handleTouchEnd = async (
    e: React.TouchEvent,
    _casePutTableId: number,
    placePutCard: string,
  ) => {
    if (!dragPayload.current) return;

    const touch = e.changedTouches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!target) return;

    const dropZone = target.closest<HTMLElement>("[data-drop-id]");
    if (!dropZone) return;

    const resolvedCasePutTableId = Number(dropZone.dataset.dropId);
    const resolvedPlacePutCard = dropZone.dataset.dropPlace ?? placePutCard;

    const { casePickTableId, placePickCard, cardIndex } = dragPayload.current;
    dragPayload.current = null;

    if (casePickTableId === resolvedCasePutTableId) return;

    await applyDrop({
      casePickTableId,
      casePutTableId: resolvedCasePutTableId,
      placePickCard,
      placePutCard: resolvedPlacePutCard,
      cardIndex,
    });
  };

  const applyDrop = async ({
    casePickTableId,
    casePutTableId,
    placePickCard,
    placePutCard,
    cardIndex,
  }: {
    casePickTableId: number;
    casePutTableId: number;
    placePickCard: string;
    placePutCard: string;
    cardIndex: number;
  }) => {
    if (!casePickTableId || !casePutTableId) return;

    try {
      if (placePickCard === "table") {
        const sourceBox = await getTableBox(casePickTableId);

        if (placePutCard === "table") {
          const updatedTable = await moveCardTableToTable({
            casePutTableId,
            casePickTableId,
            card: sourceBox.card,
            card_state: sourceBox.card_state,
            user: getPlayer(),
          });
          setTable(updatedTable);
        } else if (placePutCard === "hand") {
          const updatedHand = await addCardToHand(getPlayer(), sourceBox.card);
          setHand(updatedHand);

          const updatedTable = await clearTableBox({
            casePickTableId,
            casePutTableId,
          });
          setTable(updatedTable);
        }
      } else if (placePickCard === "hand") {
        if (placePutCard === "table") {
          const cardFromHand = hand[cardIndex];
          if (!cardFromHand) {
            console.error("Карта не найдена в руке по индексу", cardIndex);
            return;
          }

          const updatedTable = await moveCardHandToTable({
            casePutTableId,
            casePickTableId,
            card: cardFromHand,
            user: getPlayer(),
          });
          setTable(updatedTable);

          const updatedHand = await removeCardFromHand(getPlayer(), cardIndex);
          setHand(updatedHand);
        }
      }
    } catch (error) {
      console.error("Ошибка при перетаскивании:", error);
    }
  };

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleTouchStart,
    handleTouchEnd,
  };
};
