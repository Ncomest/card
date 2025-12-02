import styled from "styled-components";
import { SideStatusState } from "./side_status_state/side_status_state";
import { MdHeartBroken } from "react-icons/md";
import { GiBlood } from "react-icons/gi";
import { GiPoisonBottle } from "react-icons/gi";
import { GiChestArmor } from "react-icons/gi";
import { BsLightningChargeFill } from "react-icons/bs";
import { BsFire } from "react-icons/bs";
import type { ICardState } from "@/types/types";

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
  z-index: 1;
`;

function SideStatus({ item, isZoom }: { item: ICardState; isZoom: boolean }) {
  const { have_damaged, blood, poison, armor, stack, fire } = item;

  return (
    <Component $isZoom={isZoom}>
      {have_damaged ?<SideStatusState icon={<MdHeartBroken />} text={have_damaged} /> : null}
      {blood ? <SideStatusState icon={<GiBlood />} text={blood} /> : null}
      {poison ? <SideStatusState icon={<GiPoisonBottle />} text={poison} /> : null}
      {armor ? <SideStatusState icon={<GiChestArmor />} text={armor} /> : null}
      {stack ? <SideStatusState icon={<BsLightningChargeFill />} text={stack} /> : null}
      {fire ? <SideStatusState icon={<BsFire />} text={fire} /> : null}
    </Component>
  );
}

export default SideStatus;
