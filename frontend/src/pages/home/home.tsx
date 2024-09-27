import { useEffect, useState } from "react";
import Card from "../../components/card/card";
import Table from "../../modules/table/table";
import SelectPlayer from "../../components/select_player/select_player";

type IData = {
 name: string;
 url: string;
 _id: string;
};

type ITablePayload = {
 url: string;
 name: string;
 cardId: string;
};

type ITable = {
 id: number;
 payload: ITablePayload;
};

export default function Home() {
 const [fetchData, setFetchData] = useState<IData[]>([]);
 const [fetchData2, setFetchData2] = useState<IData[]>([]);
 const [fetchTable, setFetchTable] = useState<ITable[]>([]);

 useEffect(() => {
  fetch("http://localhost:4000/api/products")
   .then((response) => response.json())
   .then((data: IData[]) => setFetchData(data))
   .catch((error) => console.log("error", error));

  fetch("http://localhost:4000/api/orcs")
   .then((response) => response.json())
   .then((data: IData[]) => setFetchData2(data))
   .catch((error) => console.log("error", error));
 }, []);

 //===============test==================//
 const handlePost = () => {
  fetch("http://localhost:4000/api/table", {
   method: "GET",
   headers: { "Content-Type": "application/json" },
   //  body: JSON.stringify({ value: 5 }),
  })
   .then((res) => res.json())
   .then((res) => setFetchTable(res))
   //  .then((res) => console.log(res))
   .catch((err) => err);
 };

//  console.log(fetchTable);
 useEffect(() => {
  // handlePost();
 }, []);
 //===============test==============//

 return (
  <>
   <SelectPlayer />
   {/* <button onClick={handlePost}>click</button> */}
   {/* {fetchTable.map((el) => (
    <Table key={el.id} data={el}/>
   ))} */}
   {/* {fetchData.map((el) => (
    <Card key={el._id} data={el} />
   ))} */}

   {/* {fetchData2.map((el) => (
    <Card key={el._id} data={el} />
   ))} */}
  </>
 );
}
