import styled from "styled-components";
import { SideStatusState } from "./side_status_state/side_status_state";
import { MdHeartBroken } from "react-icons/md";
import { GiBlood } from "react-icons/gi";
import { GiPoisonBottle } from "react-icons/gi";
import { GiChestArmor } from "react-icons/gi";
import { BsLightningChargeFill } from "react-icons/bs";
import { BsFire } from "react-icons/bs";

const Component = styled.div<{ $isZoom: boolean }>`
  padding: 2px;
  background-color: white;
  color: black;
  border: 1px solid;
  border-radius: 5px;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: ${(prop) => (prop.$isZoom ? "8%" : "14%")};
  right: ${(prop) => (prop.$isZoom ? "-19%" : "-10%")};
  transform: ${(prop) => prop.$isZoom && "scale(0.5)"};
  transition: transform 0.4s ease-in-out;
  gap: 5px;
`;

function SideStatus({ item, isZoom }: any) {
  return (
    <Component $isZoom={isZoom}>
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
        <SideStatusState
          icon={<GiChestArmor />}
          text={item?.card_state?.armor}
        />
      ) : null}
      {item?.card_state?.stack ? (
        <SideStatusState
          icon={<BsLightningChargeFill />}
          text={item?.card_state?.stack}
        />
      ) : null}
      {item?.card_state?.fire ? (
        <SideStatusState icon={<BsFire />} text={item?.card_state?.fire} />
      ) : null}
    </Component>
  );
}

export default SideStatus;
