import styled from "styled-components";
import { SideStatusState } from "../side_status_state/SideStatusState";
import { RiRefreshLine } from "react-icons/ri";
import { fetchApi } from "../../../../shared/api/fetchApi";
import type { ICardTable } from "../../model/types";

const StateLineStyle = styled.div`
  display: flex;
  padding: 2px;
  gap: 5px;
  align-items: center;
  justify-content: center;
`;

const InputStyle = styled.input`
  width: 40px;
`;

const ButtonStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
`;

interface ILineStatusStateProps {
  item: ICardTable;
  icon: React.ReactElement;
  text: string;
}

export const LineStatusState = ({
  item,
  icon,
  text,
}: ILineStatusStateProps) => {
  const handleFetchCardState = async (
    e: React.FocusEvent<HTMLInputElement>,
  ) => {
    await fetchApi({
      API_URI: `/api/table/${item._id}`,
      method: "PUT",
      body: {
        currCardState: text,
        value: Number(e.target.value),
        set_state: "setstate",
      },
    });
  };

  return (
    <StateLineStyle>
      <SideStatusState icon={icon} state={text} />
      <InputStyle type="number" onBlur={handleFetchCardState} />
      <ButtonStyle>
        <RiRefreshLine />
      </ButtonStyle>
    </StateLineStyle>
  );
};
