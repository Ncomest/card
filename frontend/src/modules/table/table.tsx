import styled from "styled-components";
// import Card from "../../components/card/card";

const Component = styled.div`
 border: 1px solid;
 height: 300px;
`;

const ImageContainer = styled.div`
 /* height: 280px; */
 /* width: 100%; */
`;
const Image = styled.img`
 width: 100%;
 height: 100%;
`;

function Table({ item }: any) {
 return (
  <Component id={item._id}>
   <p>{item._id}</p>
   {item.isEmpty ? (
    <p>Yes</p>
   ) : (
    <div>
     <p>{item.card.name}</p>
     <ImageContainer>
      <Image src={item.card.url} alt={item.card.name} />
     </ImageContainer>
     <p>{item.card_state.have_damaged}</p>
     <p>{item.card_state.blood}</p>
    </div>
   )}
  </Component>
 );
}

export default Table;
