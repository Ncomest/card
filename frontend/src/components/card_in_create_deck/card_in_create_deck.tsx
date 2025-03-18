import styled from "styled-components";
import { ICard } from "../../pages/home/home";

const ContainerStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ImageStyle = styled.img`
  border-radius: 10px;
  border: 1px solid #bebebe;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ButtonAddStyle = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;

  background-color: #c2fbd7;
  border-radius: 5px;
  box-shadow: rgba(44, 187, 99, 0.2) 0 -25px 18px -14px inset,
    rgba(44, 187, 99, 0.15) 0 1px 2px, rgba(44, 187, 99, 0.15) 0 2px 4px,
    rgba(44, 187, 99, 0.15) 0 4px 8px, rgba(44, 187, 99, 0.15) 0 8px 16px,
    rgba(44, 187, 99, 0.15) 0 16px 32px;
  color: green;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 10px;
  border: 0;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    box-shadow: rgba(44, 187, 99, 0.35) 0 -25px 18px -14px inset,
      rgba(44, 187, 99, 0.25) 0 1px 2px, rgba(44, 187, 99, 0.25) 0 2px 4px,
      rgba(44, 187, 99, 0.25) 0 4px 8px, rgba(44, 187, 99, 0.25) 0 8px 16px,
      rgba(44, 187, 99, 0.25) 0 16px 32px;
  }
`;

interface IProp {
  card: ICard;
  addCard: (card: ICard) => void;
}

const CardInCreateDeck = ({ card, addCard }: IProp) => {
  return (
    <ContainerStyle>
      <ImageStyle src={card.uri} alt={card.name} />
      <div>
        <p>{card.name}</p>
        <ButtonAddStyle onClick={() => addCard(card)}>+</ButtonAddStyle>
      </div>
    </ContainerStyle>
  );
};

export default CardInCreateDeck;
