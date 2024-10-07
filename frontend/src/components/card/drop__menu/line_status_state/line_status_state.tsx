import styled from "styled-components";
import { SideStatusState } from "../../side_status/side_status_state/side_status_state";
import { TbRefresh } from "react-icons/tb";

const StateLine = styled.div`
 display: flex;
 padding: 2px;
 gap: 5px;
 align-items: center;
 justify-content: center;
`;

const Button = styled.button`
 display: flex;
 align-items: center;
 justify-content: center;
 width: 20px;
 height: 20px;
`;

const Input = styled.input`
 max-width: 100px;
 width: 50px;
`;

export const LineStatusState = ({ item, icon, text }: any) => {
 return (
  <StateLine>
   <SideStatusState icon={icon} text={text} />
   <Input />
   <Button>
    <TbRefresh />
   </Button>
  </StateLine>
 );
};
