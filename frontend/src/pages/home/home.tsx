import { useEffect, useState } from "react";
import Table from "../../modules/table/table";
import SelectPlayer from "../../components/select_player/select_player";
import SelectDeck from "../../components/select_deck/select_deck";
import styled from "styled-components";

// type IData = {
//  name: string;
//  url: string;
//  _id: string;
// };

// type ITableCard = {
//  _id: string;
//  url: string;
//  name: string;
// };

type ITable = {
 _id: number;
 isEmpty: boolean;
 __v: number;
 //  card: ITableCard;
};

const Component = styled.div`
 padding: 10px;
 display: grid;
 grid-template-columns: repeat(7, 1fr);
 grid-template-rows: repeat(3, 1fr);
 gap: 20px;
`;

export default function Home() {
 const [table, setTable] = useState<ITable[]>([]);

 useEffect(() => {
  fetch("http://localhost:4000/api/table", {
   method: "GET",
   headers: { "Content-Type": "application/json" },
  })
   .then((res) => res.json())
   .then((res) => setTable(res))
   .catch((err) => console.log(err));
 }, []);

 return (
  <>
   <SelectPlayer />
   <SelectDeck />
   <Component>
    {table
     .sort((a, b) => a._id - b._id)
     .map((item) => (
      <Table key={item._id} item={item} />
     ))}
   </Component>
  </>
 );
}
