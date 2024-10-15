import styled from "styled-components";
import { IDeck } from "../select_deck/select_deck";

interface IHandCard {
 card: IDeck;
}

const Component = styled.div`
 width: 100%;
 height: 240px;
 border: 1px solid #fff;
 border-radius: 5px;
 transition: transform 0.3s ease;

 &:hover {
  z-index: 10;
  transform: scale(1.8);
 }
`;

const Image = styled.img`
 border-radius: 5px;
 width: 100%;
 height: 100%;
`;

const HandCard: React.FC<IHandCard> = ({ card }) => {
 return (
  <Component draggable="true">
   {/* <ImgContainer> */}
   <Image src={card?.url} alt={card?.name} loading="lazy" />
   {/* </ImgContainer> */}
  </Component>
 );
};

export default HandCard;
