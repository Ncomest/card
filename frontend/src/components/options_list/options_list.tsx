import styled from "styled-components";

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

type TProps = {
  name: string;
  text: string;
  arr: string[] | number[];
  dropdownFilter: string;
  onChange: (n: string, v: string) => void;
};

const OptionsList = ({
  name,
  text,
  arr,
  dropdownFilter,
  onChange,
}: TProps) => {

  function mappingFn(arr: number[] | string[]): JSX.Element[] {
    //возвращает jsx разметку из массива
    return arr.map((el, i) => (      
      <option key={el} value={el}>
        {el}
      </option>
    ));
  }

  const options = mappingFn(arr);

  return (
    <SortContainer>
      <p>{text}</p>
      <SelectStyle
        value={dropdownFilter}
        name={name}
        onChange={(e) => onChange(name, e.target.value)}
      >
        <option value="">Выберите</option>
        {options}
      </SelectStyle>
    </SortContainer>
  );
};
export default OptionsList;
