import styled from "styled-components";
import { MdHeartBroken } from "react-icons/md";
import { GiBlood } from "react-icons/gi";
import { GiPoisonBottle } from "react-icons/gi";
import { GiChestArmor } from "react-icons/gi";
import { BsLightningChargeFill } from "react-icons/bs";
import { LineStatusState } from "./line_status_state/line_status_state";

const Component = styled.div`
 background-color: white;
 position: absolute;
 top: 30px;
 right: -15px;
 border: 1px solid;
 border-radius: 3px;
`;

const DropMenu = ({ item }: any) => {
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
  </Component>
 );
};

export default DropMenu;
