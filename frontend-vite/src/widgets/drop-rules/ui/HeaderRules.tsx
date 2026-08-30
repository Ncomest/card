import styled from "styled-components";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  color: #bebebe;
  border-bottom: 1px solid #bebebe;
  cursor: pointer;
  &:hover {
    background-color: #626262c3;
  }
`;

const TitleStyle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 16px;
  color: #ce8d00;
  padding: 0 5px;
`;

type THeaderRulesProps = {
  componentName: string | null;
  onClick?: () => void;
  title?: string;
};

export const HeaderRules = ({
  title,
  componentName,
  onClick,
}: THeaderRulesProps) => {
  return (
    <HeaderStyle onClick={onClick}>
      <TitleStyle>{title}</TitleStyle>
      {!componentName ? (
        <MdKeyboardDoubleArrowDown color="#ce8d00" />
      ) : (
        <MdKeyboardDoubleArrowUp color="#ce8d00" />
      )}
    </HeaderStyle>
  );
};
