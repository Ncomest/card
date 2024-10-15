import styled from "styled-components";
import { SideStatusState } from "../../side_status/side_status_state/side_status_state";

import { site } from "../../../../site_state";


const StateLine = styled.div`
 display: flex;
 padding: 2px;
 gap: 5px;
 align-items: center;
 justify-content: center;
`;

const Input = styled.input`
 max-width: 100px;
 width: 50px;
`;

export const LineStatusState = ({ item, icon, text }: any) => {
 const apiUrl = site;

 const handleFetchCardState = async (e: any) => {
  try {
   const res = await fetch(`${apiUrl}/api/table/${item._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
     currCardState: text,
     value: Number(e.target.value),
     set_state: "setstate",
    }),
   });

   if (!res.ok) {
    throw new Error("Ошибка resok");
   }

   const data = await res.json();
   console.log(data);
  } catch (error) {
   console.error(error, "ошибка сработал catch");
  }
 };

 return (
  <StateLine>
   <SideStatusState icon={icon} />
   <Input onBlur={handleFetchCardState} />
  </StateLine>
 );
};
