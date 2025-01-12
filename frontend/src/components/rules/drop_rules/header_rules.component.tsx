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

interface IHeader {
  title?: string;
  isOpen: string | null | boolean;
  onClick?: any;
}

const HeaderRules = ({ title, isOpen, onClick }: IHeader) => {
  return (
    <HeaderStyle onClick={onClick}>
      <TitleStyle>{title}</TitleStyle>
      {!isOpen ? (
        <MdKeyboardDoubleArrowDown color="#ce8d00" />
      ) : (
        <MdKeyboardDoubleArrowUp color="#ce8d00" />
      )}
    </HeaderStyle>
  );
};

export default HeaderRules;
