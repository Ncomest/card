import HandCard from "../hand_card/hand_card";
import styled from "styled-components";
import { StyledButton } from "../../style/global.style";
import { fetchApi } from "../../helper/fetchApi";
import { ICard } from "../../pages/home/home";

const ComponentStyle = styled.div`
  background: #0b0b0b;
  overflow: hidden;
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

const ButtonStyle = styled(StyledButton)``;

export interface IDrag {
  e?: any;
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
  handleDragOver: (e: any) => void;
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
    const data = await fetchApi({
      API_URI: "/api/hand/random",
      method: "POST",
      body: {
        user: sessionStorage.getItem("player"),
      },
    });
    setHand(data);
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
      <ButtonStyle onClick={handleSelectDeck}>
        <span>Random</span>
      </ButtonStyle>
      <ButtonStyle className="btn btn-primary" onClick={handleUpdateDeck}>
        <span>Удалить карты из руки</span>
      </ButtonStyle>
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
    </ComponentStyle>
  );
};

export default SelectDeck;
