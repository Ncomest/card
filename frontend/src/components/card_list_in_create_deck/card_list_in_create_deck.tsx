import styled from "styled-components";
import { ICard } from "../../pages/home/home";
import { sites } from "../../site_state";

interface IProps {
  index: number;
  deckList: ICard;
}

const ContainerStyle = styled.div`
  height: 44px;
  width: 100%;
  display: inline-flex;
  background-color: #737373;
  padding: 2px;
  border-radius: 5px;
`;

const PStyle = styled.p`
  width: 10%;
  font-size: 16px;
  text-align: center;
  margin: auto;
  color: #dfdcdc;
`;

const ImageStyle = styled.img`
  border: 1px solid #bebebe;
  border-radius: 5px;
  height: 40px;
  width: 90%;
  object-fit: cover;
  object-position: 0 -9px;
  margin: auto;
`;

const CardListInCreateDeck = ({ deckList, index }: IProps) => {
  return (
    <ContainerStyle>
      <PStyle>{index + 1}</PStyle>
      <ImageStyle src={sites + deckList.uri} alt={deckList.name} />
    </ContainerStyle>
  );
};

export default CardListInCreateDeck;
