import styled from "styled-components";
import { IDeck } from "../select_deck/select_deck";

interface IHandCard {
 card: IDeck;
}

const Component = styled.div`
 /* width: 240px; */
 height: 400px;
`;

const ImgContainer = styled.div`
 width: 100%;
 height: 100%;
`;

const Image = styled.img`
 width: 100%;
 height: 100%;
`;

const HandCard: React.FC<IHandCard> = ({ card }) => {
 return (
  <Component draggable="true">
   <ImgContainer>
    <Image src={card.url} alt={card.name} loading="lazy" />
   </ImgContainer>
  </Component>
 );
};

export default HandCard;
