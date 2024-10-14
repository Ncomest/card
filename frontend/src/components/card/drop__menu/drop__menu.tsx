import styled from "styled-components";
import { MdHeartBroken } from "react-icons/md";
import { GiBlood } from "react-icons/gi";
import { GiPoisonBottle } from "react-icons/gi";
import { GiChestArmor } from "react-icons/gi";
import { BsLightningChargeFill } from "react-icons/bs";
import { SideStatusState } from "../side_status/side_status_state/side_status_state";
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
//  const { blood, have_damaged, poison, armor, stack } = item.card_state;
 return (
  <Component>
   {item?.card_state?.have_damaged && <LineStatusState item={item} icon={<MdHeartBroken />} text={item?.card_state?.have_damaged} />}
   {/* {blood && <LineStatusState item={item} icon={<GiBlood />} text={blood} />}
   {poison && <LineStatusState item={item} icon={<GiPoisonBottle />} text={poison} />}
   {armor && <LineStatusState item={item} icon={<GiChestArmor />} text={armor} />}
   {stack && <LineStatusState item={item} icon={<BsLightningChargeFill />} text={stack} />} */}
  </Component>
 );
};

export default DropMenu;
