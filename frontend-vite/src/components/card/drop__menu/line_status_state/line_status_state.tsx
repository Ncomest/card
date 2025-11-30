import styled from "styled-components";
import { SideStatusState } from "../../side_status/side_status_state/side_status_state";
import { RiRefreshLine } from "react-icons/ri";
import { fetchApi } from "../../../../helper/fetchApi";

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

export const LineStatusState = ({ item, icon, text }: any) => {
  
  const handleFetchCardState = async (e: any) => {
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
      <SideStatusState icon={icon} />
      <InputStyle type="number" onBlur={handleFetchCardState} />
      <ButtonStyle>
        <RiRefreshLine />
      </ButtonStyle>
    </StateLineStyle>
  );
};
