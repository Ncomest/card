import styled from "styled-components";
import { SideStatusState } from "./side_status_state/side_status_state";
import { MdHeartBroken } from "react-icons/md";
import { GiBlood } from "react-icons/gi";
import { GiPoisonBottle } from "react-icons/gi";
import { GiChestArmor } from "react-icons/gi";
import { BsLightningChargeFill } from "react-icons/bs";

const Component = styled.div`
 padding: 2px;
 background-color: white;
 color: black;
 border: 1px solid;
 border-radius: 5px;
 position: absolute;
 display: flex;
 flex-direction: column;
 top: 30px;
 right: -16px;
 gap: 5px;
`;

function SideStatus({ item }: any) {
//  const { blood, have_damaged, poison, armor, stack } = item?.card_state;
 return (
  <Component>
   {item?.card_state?.have_damaged && <SideStatusState icon={<MdHeartBroken />} text={item?.card_state?.have_damaged} />}
   {/* {blood && <SideStatusState icon={<GiBlood />} text={blood} />}
   {poison &&<SideStatusState icon={<GiPoisonBottle />} text={poison} />}
   {armor && <SideStatusState icon={<GiChestArmor />} text={armor} />}
   {stack && <SideStatusState icon={<BsLightningChargeFill />} text={stack} />} */}
  </Component>
 );
}

export default SideStatus;
