import { useEffect, useState } from "react";
import Table from "../../modules/table/table";
import SelectPlayer from "../../components/select_player/select_player";
import SelectDeck from "../../components/select_deck/select_deck";
import styled from "styled-components";
import Card from "../../components/card/card";

const TableContainer = styled.div`
 padding: 10px;
 display: grid;
 grid-template-columns: repeat(7, 1fr);
 grid-template-rows: repeat(3, 1fr);
 gap: 20px;
`;

type ITable = {
 _id: number;
 isEmpty: boolean;
};

interface ICard {
 _id: string;
 url: string;
 name: string;
}

interface ICardState {
 haveDamaged: Number;
 poison: Number;
 blood: Number;
 armor: Number;
 stack: Number;
 stepOver: Boolean;
 stepSkip: Boolean;
}

interface ICardTable {
 _id: number;
 isEmpty: boolean;
 card: ICard;
 cardState: ICardState;
}

function Home() {
 const [table, setTable] = useState<ITable[]>([]);
 const [cardTable, setCardTable] = useState<ICardTable[]>([]);
 const [cardHand, setCardHand] = useState<ICardTable[]>([]);

 useEffect(() => {
  fetch("http://localhost:4000/api/table", {
   method: "GET",
   headers: { "Content-Type": "application/json" },
  })
   .then((res) => res.json())
   .then((res) => setTable(res))
   .catch((err) => console.log(err));
 }, []);

 const handleDragStart = (e: any, cardId: any) => {
  e.dataTransfer.setData("cardId", cardId);
 };
 const handleDragOver = (e: any) => {
  e.preventDefault();
 };
 const handleDrop = (e: any, targetCardId: any) => {
  e.preventDefault();
 };

 return (
  <>
   <SelectPlayer />
   <TableContainer>
    {table
     .sort((a, b) => a._id - b._id)
     .map((item) => (
      <Card key={item._id} item={item} />
      // <Table key={item._id} item={item} />
     ))}
   </TableContainer>
   <SelectDeck />
  </>
 );
}

export default Home;
