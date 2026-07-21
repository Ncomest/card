import HandCard from "../../components/hand_card/hand_card";
import styled from "styled-components";
import type { ICard } from "@/shared/lib/types/types";
import { Link } from "react-router-dom";
import ChoiceDeck from "../../components/choice_deck/choice_deck";
import { Button } from "@/shared/ui/button";
import {
  selectCurrentDeck,
  clearPlayerHand,
  getRandomDeck,
} from "@/features/player-hand";

const ComponentStyle = styled.div`
  background: var(--primary-color);
  overflow: hidden;
  padding: 10px 5px;
`;

const HandStyle = styled.div`
  overflow: hidden;
  margin: 0 auto;
  padding: 60px 10px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  border: 1px solid;
  background: rgba(0, 0, 0, 0.434);
`;

const NewDeckContainerStyle = styled.div`
  padding: 20px;
  background-color: var(--secondary-color);
  border-radius: 5px;
`;

const NavStyled = styled.nav`
  display: flex;
  justify-content: start;
  align-items: center;
  column-gap: 20px;
  margin-bottom: 10px;
`;

type TDragStartParams = {
  e: React.DragEvent;
  casePickTableId?: number;
  cardId?: string | null;
  placePickCard?: string;
  cardIndex?: number;
};

type TDragDropParams = {
  e: React.DragEvent;
  casePutTableId?: number;
  placePutCard?: string;
};

type TTouchStart = {
  casePickTableId?: number;
  cardId?: string | null;
  placePickCard?: string;
  cardIndex?: number;
};

type TSelectDeckProps = {
  handleDragStart: (params: TDragStartParams) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (params: TDragDropParams) => void;
  handleTouchStart: (params: TTouchStart) => void;
  handleTouchEnd: (
    e: React.TouchEvent,
    casePutTableId: number,
    placePutCard: string,
  ) => void;
  hand: ICard[];
  setHand: React.Dispatch<React.SetStateAction<ICard[]>>;
};

const SelectDeck: React.FC<TSelectDeckProps> = ({
  hand,
  setHand,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleTouchStart,
  handleTouchEnd,
}) => {
  //POST select deck
  const handleRamdomDeck = () => {
    getRandomDeck()
      .then((data) => setHand(data as ICard[]))
      .catch((e) => console.error(e));
  };

  //POST select current deck
  const handleSelectCurrentDeck = async () => {
    selectCurrentDeck()
      .then((data) => setHand(data as ICard[]))
      .catch((e) => console.error(e));
  };

  //PUT clear hand
  const handleClearHand = async () => {
    clearPlayerHand()
      .then((data) => setHand(data as ICard[]))
      .catch((e) => console.error(e));
  };

  return (
    <ComponentStyle>
      <NewDeckContainerStyle>
        <NavStyled>
          <Button type="game" size="l" onClick={handleRamdomDeck}>
            Случайно
          </Button>

          <Button type="game" size="l" onClick={handleClearHand}>
            Удалить карты из руки
          </Button>

          <Link to={"/create_deck"}>
            <Button type="game" size="l">
              + Собрать колоду
            </Button>
          </Link>
        </NavStyled>

        <ChoiceDeck onClick={handleSelectCurrentDeck} />
      </NewDeckContainerStyle>

      {hand.length !== 0 && (
        <HandStyle>
          {hand.map((card, index) => (
            <div
              key={card._id}
              draggable={true}
              data-drop-id={-1}
              data-drop-place="hand"
              onDragStart={(e) =>
                handleDragStart({
                  e,
                  cardId: card._id,
                  placePickCard: "hand",
                  casePickTableId: -1,
                  cardIndex: index,
                })
              }
              onDragOver={handleDragOver}
              onDrop={(e) =>
                handleDrop({
                  e,
                  placePutCard: "hand",
                  casePutTableId: -1,
                })
              }
              onTouchStart={() =>
                handleTouchStart({
                  cardId: card._id,
                  placePickCard: "hand",
                  casePickTableId: -1,
                  cardIndex: index,
                })
              }
              onTouchEnd={(e) => handleTouchEnd(e, -1, "hand")}
            >
              <HandCard card={card} index={index} />
            </div>
          ))}
        </HandStyle>
      )}
    </ComponentStyle>
  );
};

export default SelectDeck;
