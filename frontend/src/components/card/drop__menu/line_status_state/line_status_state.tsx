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

 const handleFetchCardState = (e: any) => {

  fetch(apiUrl + `/api/table/${item._id}`, {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({
    currCardState: text,
    value: e.target.value,
    set_state: "setstate",
   }),
  })
   .then((res) => res.json())
   .then((res) => console.log(res))
   .catch((err) => console.log(err));
 };

 return (
  <StateLine>
   <SideStatusState icon={icon} />
   <Input onChange={handleFetchCardState} />
  </StateLine>
 );
};
