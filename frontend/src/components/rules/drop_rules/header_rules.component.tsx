import styled from "styled-components";
import {
  MdKeyboardDoubleArrowDown,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  color: #bebebe;
  border-bottom: 1px solid #bebebe;
  cursor: pointer;
  &:hover {
    background-color: #626262c3;
  }
`;

const Title = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 16px;
  color: #ce8d00;
  padding: 0 5px;
`;

const Icon = styled.div``;

interface IHeader {
  title: string;
  isOpen: string | null | boolean;
}

const HeaderRules = ({ title, isOpen }: IHeader) => {
  return (
    <Header>
      <Title>{title}</Title>
      {/* <Icon>{!isOpen ? "arrowDown" : "arrowUp"}</Icon> */}
      {!isOpen ? (
        <MdKeyboardDoubleArrowDown color="#ce8d00" />
      ) : (
        <MdKeyboardDoubleArrowUp color="#ce8d00" />
      )}
    </Header>
  );
};

export default HeaderRules;
