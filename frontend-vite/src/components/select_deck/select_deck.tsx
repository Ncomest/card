import HandCard from "../hand_card/hand_card";
import styled from "styled-components";
import { StyledButton } from "../../style/global.style";
import { fetchApi } from "../../helper/fetchApi";
import type { ICard } from "@/types/types";
import { Link } from "react-router-dom";
import ChoiceDeck from "../choice_deck/choice_deck";

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
  padding: 20px 10px;
  background-color: var(--secondary-color);
  border-radius: 5px;
`;

const ButtonStyle = styled(StyledButton)`
  margin-right: 20px;
  margin-bottom: 20px;
`;

export interface IDrag {
  e?: React.DragEvent<HTMLDivElement>;
  casePickTableId?: number;
  casePutTableId?: number;
  cardId?: string | null;
  placePickCard?: string;
  placePutCard?: string;
  cardIndex?: number;
}

interface SelectDeckProps {
  handleDragStart: ({
    e,
    casePickTableId,
    cardId,
    placePickCard,
    cardIndex,
  }: IDrag) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: ({ e, casePutTableId }: IDrag) => void;
  hand: ICard[];
  setHand: React.Dispatch<React.SetStateAction<ICard[]>>;
}

const SelectDeck: React.FC<SelectDeckProps> = ({
  hand,
  setHand,
  handleDragStart,
  handleDragOver,
  handleDrop,
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
    console.log(data, "hand");
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
    console.log(data, "hand");
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
        <ButtonStyle onClick={handleSelectDeck}>
          <span>Random</span>
        </ButtonStyle>
        <ButtonStyle className="btn btn-primary" onClick={handleUpdateDeck}>
          <span>Удалить карты из руки</span>
        </ButtonStyle>
        <Link to={"/create_deck"}>
          <ButtonStyle>
            <span>+ Собрать колоду</span>
          </ButtonStyle>
        </Link>
        <ChoiceDeck onClick={handleSelectCurrentDeck} />
      </NewDeckContainerStyle>
      {hand.length !== 0 && 
        <HandStyle>
      {hand.map((card, index) => (
        <div
          key={card._id}
          draggable={true}
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
