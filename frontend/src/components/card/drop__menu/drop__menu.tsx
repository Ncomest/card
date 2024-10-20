import styled from "styled-components";
import { MdHeartBroken } from "react-icons/md";
import { GiBlood } from "react-icons/gi";
import { GiPoisonBottle } from "react-icons/gi";
import { GiChestArmor } from "react-icons/gi";
import { BsLightningChargeFill } from "react-icons/bs";
import { LineStatusState } from "./line_status_state/line_status_state";
import { site } from "../../../site_state";

const Component = styled.div`
 background-color: white;
 position: absolute;
 top: 30px;
 right: -15px;
 border: 1px solid;
 border-radius: 3px;
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
  <Component>
   <LineStatusState
    item={item}
    icon={<MdHeartBroken />}
    text={"have_damaged"}
   />
   <LineStatusState item={item} icon={<GiBlood />} text={"blood"} />
   <LineStatusState item={item} icon={<GiPoisonBottle />} text={"poison"} />
   <LineStatusState item={item} icon={<GiChestArmor />} text={"armor"} />
   <LineStatusState
    item={item}
    icon={<BsLightningChargeFill />}
    text={"stack"}
   />
   {item.user === sessionStorage.getItem("player") &&
   item.card_state?.closed ? (
    <button type="button" onClick={handleCardToggle}>
     открыть
    </button>
   ) : null}
   <button type="button" onClick={handleCardStepOver}>
    конец хода
   </button>
  </Component>
 );
};

export default DropMenu;
