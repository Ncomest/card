import HandCard from "../hand_card/hand_card";
import styled from "styled-components";
import { fetchApi } from "../../helper/fetchApi";
import type { ICard } from "@/types/types";
import { Link } from "react-router-dom";
import ChoiceDeck from "../choice_deck/choice_deck";
import Button from "../UI/button/Button";

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
  handleTouchEnd: (e: React.TouchEvent, casePutTableId: number, placePutCard: string) => void;
  hand: ICard[];
  setHand: React.Dispatch<React.SetStateAction<ICard[]>>;
}

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
  const handleSelectDeck = async () => {
    const data: ICard[] = await fetchApi({
      API_URI: "/api/hand/random",
      method: "POST",
      body: {
        user: sessionStorage.getItem("player"),
      },
    });
    setHand(data);
    // console.log(data, "hand");
  };

  //POST select current deck
  const handleSelectCurrentDeck = async () => {
    const data: ICard[] = await fetchApi({
      API_URI: "/api/hand/current-deck",
      method: "POST",
      body: {
        user: sessionStorage.getItem("player"),
        deckName: localStorage.getItem("deckName"),
      },
    });
    setHand(data);
    // console.log(data, "hand");
  };

  //PUT clear hand
  const handleUpdateDeck = async () => {
    const data = await fetchApi({
      API_URI: "/api/hand/refresh",
      method: "PUT",
      body: { user: sessionStorage.getItem("player") },
    });
    setHand(data);
  };

  return (
    <ComponentStyle>
      {/* {decks.map((deck, i) => (
        <ButtonStyle key={i} onClick={() => handleSelectDeck(`${deck}`)}>
          <span>{deck}</span>
        </ButtonStyle>
      ))} */}
      <NewDeckContainerStyle>
        <NavStyled>
          <Button type="game" size="l" onClick={handleSelectDeck}>Случайно</Button>
          <Button type="game" size="l" onClick={handleUpdateDeck}>Удалить карты из руки</Button>
          <Link to={"/create_deck"}>
            <Button type="game" size="l">+ Собрать колоду</Button>
          </Link>
        </NavStyled>

        <ChoiceDeck onClick={handleSelectCurrentDeck} />
      </NewDeckContainerStyle>
      {hand.length !== 0 &&
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
      }
      
    </ComponentStyle>
  );
};

export default SelectDeck;
