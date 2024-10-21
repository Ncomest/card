import styled from "styled-components";
import { MdHeartBroken } from "react-icons/md";
import { GiBlood } from "react-icons/gi";
import { GiPoisonBottle } from "react-icons/gi";
import { GiChestArmor } from "react-icons/gi";
import { BsLightningChargeFill } from "react-icons/bs";
import { BsFire } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi2";
import { FaEye } from "react-icons/fa";

import { LineStatusState } from "./line_status_state/line_status_state";
import { site } from "../../../site_state";

const Component = styled.div`
 background-color: white;
 position: absolute;
 top: 30px;
 right: -15px;
 border: 1px solid;
 border-radius: 3px;
 padding: 5px;
`;

const InlineBtn = styled.button`
 padding: 2px 4px;
 display: flex;
 align-items: center;
 justify-content: center;
 /* text-align: center; */
 border: none;
 border-radius: 5px;
 background-color: transparent;
 box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
 &:hover {
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
   rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
 }
 &:active {
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
   rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
 }
`;

const LineItems = styled.div`
 display: inline-flex;
 gap: 5px;
`;

interface ICard {
 _id: string;
 url: string;
 name: string;
}

interface ICardState {
 have_damaged: number | null;
 poison: number | null;
 blood: number | null;
 armor: number | null;
 stack: number | null;
 fire: number | null;
 closed: boolean | string;
 step_over: boolean;
 step_skip: boolean;
}

interface ICardTable {
 _id: number;
 isEmpty: boolean;
 user: string;
 card?: ICard | null;
 card_state?: ICardState | null;
}

interface ICardProps {
 item: ICardTable;
}

const DropMenu: React.FC<ICardProps> = ({ item }) => {
 const apiUrl = site;

 const handleCardToggle = () => {
  console.log("item in drop menu", item);

  fetch(apiUrl + `/api/table/${item._id}`, {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({
    tshirt: "tshirt",
    userCardFront: sessionStorage.getItem("player"),
    user: item.user,
   }),
  })
   .then((res) => res.json())
   .then((res) => console.log(res))
   .catch((err) => console.log(err));
 };

 const handleCardStepOver = () => {
  console.log("handleCardStepOver", item);

  fetch(apiUrl + `/api/table/${item._id}`, {
   method: "PUT",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({
    stepOver: "stepover",
    step_over: true,
    userCardFront: sessionStorage.getItem("player"),
    user: item.user,
   }),
  })
   .then((res) => res.json())
   .then((data) => console.log(data))
   .catch((err) => console.log(err));
 };

 return (
  <Component onClick={(e:any) => e.stopPropagation()}>
   <LineStatusState item={item} icon={<MdHeartBroken />} text={"have_damaged"}/>
   <LineStatusState item={item} icon={<GiChestArmor />} text={"armor"} />
   <LineStatusState item={item} icon={<GiBlood />} text={"blood"} />
   <LineStatusState item={item} icon={<GiPoisonBottle />} text={"poison"} />
   <LineStatusState item={item} icon={<BsFire />} text={"fire"} />
   <LineStatusState item={item} icon={<BsLightningChargeFill />} text={"stack"}/>
   <LineItems>
    {item.user === sessionStorage.getItem("player") &&
     item.card_state?.closed && (
      <InlineBtn onClick={handleCardToggle}>
       <FaEye />
      </InlineBtn>
     )}
    <InlineBtn>
     <HiLockClosed onClick={handleCardStepOver} />
    </InlineBtn>
   </LineItems>
  </Component>
 );
};

export default DropMenu;
