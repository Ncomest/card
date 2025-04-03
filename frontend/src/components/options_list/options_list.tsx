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
  local?: string[] | undefined;
  arr: string[] | number[];
  dropdownFilter: string;
  onChange: (n: string, v: string) => void;
};

const OptionsList = ({
  name,
  text,
  arr,
  dropdownFilter,
  local,
  onChange,
}: TProps) => {

  function mappingFn(arr: TProps['arr'], arr2: TProps['local']): JSX.Element[] {
    //возвращает jsx разметку из массива
    return arr.map((el, i) => (
      <option key={el} value={el}>
        {arr2? arr2[i]: el}
      </option>
    ));
  }

  const options = mappingFn(arr, local);


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
        {/* {name === 'cardElement' && locals}
        {name === 'cardType' && locals}
        {name === 'cardCoins' && options} */}
      </SelectStyle>
    </SortContainer>
  );
};
export default OptionsList;
