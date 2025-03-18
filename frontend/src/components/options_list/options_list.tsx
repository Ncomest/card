import styled from "styled-components";

type TProps = {
  value: JSX.Element[]| any;
  text: string;
};

const SortContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const SelectStyle = styled.select`
  cursor: pointer;
  outline: none;
  background: #b0b0b2;
  padding: 5px 10px;
  border-radius: 5px;
`;

const OptionsList = ({ value, text }: TProps) => {
  return (
    <SortContainer>
      <p>{text}</p>
      <SelectStyle>{value}</SelectStyle>
    </SortContainer>
  );
};
export default OptionsList;
