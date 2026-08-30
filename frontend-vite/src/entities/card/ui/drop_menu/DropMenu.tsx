import styled from "styled-components";
import { MdHeartBroken } from "react-icons/md";
import { GiBlood, GiPoisonBottle, GiChestArmor } from "react-icons/gi";
import { BsLightningChargeFill, BsFire } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi2";
import { FaEye } from "react-icons/fa";
import { LineStatusState } from "./LineStatusState";
import { forwardRef } from "react";
import type { ICardTable } from "../../model/types";
import { fetchApi } from "@/shared/api";

const Component = styled.div<{ $isZoom: boolean }>`
  background-color: white;
  position: absolute;
  top: ${(prop) => (prop.$isZoom ? "-15%" : "10%")};
  right: ${(prop) => (prop.$isZoom ? "-32%" : "-10%")};
  border: 1px solid;
  border-radius: 3px;
  padding: 5px;
  z-index: 1;

  transform: ${(prop) => prop.$isZoom && "scale(0.5)"};
`;

const InlineBtn = styled.button`
  padding: 2px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  background-color: transparent;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 3px 6px,
    rgba(0, 0, 0, 0.23) 0px 3px 6px;
  &:hover {
    box-shadow:
      rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
      rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  }
  &:active {
    box-shadow:
      rgb(204, 219, 232) 3px 3px 6px 0px inset,
      rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  }
`;

const LineItems = styled.div`
  display: inline-flex;
  gap: 5px;
`;

interface IDropMenuProps {
  item: ICardTable;
  isZoom: boolean;
}

const DropMenu = forwardRef<HTMLDivElement, IDropMenuProps>(
  ({ item, isZoom }: IDropMenuProps, ref) => {
    const handleCardToggle = async () => {
      await fetchApi({
        API_URI: `/api/table/${item._id}`,
        method: "PUT",
        body: {
          tshirt: "tshirt",
          userCardFront: sessionStorage.getItem("player"),
          user: item.user,
        },
      });
    };

    const handleCardStepOver = async () => {
      await fetchApi({
        API_URI: `/api/table/${item._id}`,
        method: "PUT",
        body: {
          stepOver: "stepover",
          step_over: true,
          userCardFront: sessionStorage.getItem("player"),
          user: item.user,
        },
      });
    };

    return (
      <Component
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
        ref={ref}
        $isZoom={isZoom}
      >
        <LineStatusState
          item={item}
          icon={<MdHeartBroken />}
          text={"have_damaged"}
        />
        <LineStatusState item={item} icon={<GiChestArmor />} text={"armor"} />
        <LineStatusState item={item} icon={<GiBlood />} text={"blood"} />
        <LineStatusState
          item={item}
          icon={<GiPoisonBottle />}
          text={"poison"}
        />
        <LineStatusState item={item} icon={<BsFire />} text={"fire"} />
        <LineStatusState
          item={item}
          icon={<BsLightningChargeFill />}
          text={"stack"}
        />
        <LineItems>
          {item.user === sessionStorage.getItem("player") &&
            item.card_state?.closed && (
              <InlineBtn onClick={handleCardToggle}>
                <FaEye color="black" />
              </InlineBtn>
            )}
          <InlineBtn>
            <HiLockClosed color="black" onClick={handleCardStepOver} />
          </InlineBtn>
        </LineItems>
      </Component>
    );
  },
);

export default DropMenu;
