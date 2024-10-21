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
 return (
  <Component>
   {item?.card_state?.have_damaged ? (
    <SideStatusState
     icon={<MdHeartBroken />}
     text={item?.card_state?.have_damaged}
    />
   ) : null}
   {item?.card_state?.blood ? (
    <SideStatusState icon={<GiBlood />} text={item?.card_state?.blood} />
   ) : null}
   {item?.card_state?.poison ? (
    <SideStatusState
     icon={<GiPoisonBottle />}
     text={item?.card_state?.poison}
    />
   ) : null}
   {item?.card_state?.armor ? (
    <SideStatusState icon={<GiChestArmor />} text={item?.card_state?.armor} />
   ) : null}
   {item?.card_state?.stack ? (
    <SideStatusState
     icon={<BsLightningChargeFill />}
     text={item?.card_state?.stack}
    />
   ) : null}
  </Component>
 );
}

export default SideStatus;
