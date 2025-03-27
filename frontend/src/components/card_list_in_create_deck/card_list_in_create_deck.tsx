import styled from "styled-components";
import { ICard } from "../../pages/home/home";
import { sites } from "../../site_state";
import { useState } from "react";

interface IProps {
  index: number;
  deckList: ICard;
  onClick: (index: any) => void;
}

const ContainerStyle = styled.div`
  position: relative;
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
  filter: brightness(90%);
  
  &:hover {
    filter: brightness(110%);
  }
`;

const ButtonStyle = styled.button`
  position: absolute;
  right: 4px;
  top: 4px;
  background: #ff4742;
  border: 3px solid #b53935;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  min-height: 25px;
  padding: 5px 10px;

  &:active {
    opacity: 0.5;
  }
`;

const CardListInCreateDeck = ({ deckList, index, onClick }: IProps) => {

  const [isHover, setIsHover] = useState(false);

  return (
    <ContainerStyle onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <PStyle>{index + 1}</PStyle>
      <ImageStyle src={sites + deckList.uri} alt={deckList.name} />
      {isHover && <ButtonStyle onClick={() => onClick(index)}>X</ButtonStyle>}
    </ContainerStyle>
  );
};

export default CardListInCreateDeck;
