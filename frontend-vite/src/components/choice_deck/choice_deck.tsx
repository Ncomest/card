import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchApi } from "../../helper/fetchApi";
import { StyledButton } from "../../style/global.style";

const ComponentStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const H3Style = styled.h3`
  color: #bebebe;
`;

const SelectStyle = styled.select`
  padding: 8px 10px;
  border-radius: 5px;
  outline: none;
  background-color: var(--secondary-color);
  color: #bebebe;
  text-transform: capitalize;
`;

const OptionStyle = styled.option`
  color: #bebebe;
  background-color: var(--secondary-color);
  text-transform: capitalize;
`;

const ButtonStyle = styled(StyledButton)``;

interface IProp {
  onClick: () => void;
}

const ChoiceDeck = ({ onClick }: IProp) => {
  const [deck, setDeck] = useState<string[]>([]);
  const [localDeckName, setLocalDeckName] = useState("");

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const data = await fetchApi({ API_URI: "/api/decks/all-deck" });
        setDeck(data);
        // console.log(data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchDeck();
  }, []);

  useEffect(() => {
    localStorage.setItem("deckName", localDeckName);
  }, [localDeckName]);

  const deckList = deck.map((el: string) => (
    <OptionStyle value={el} key={el}>
      {el}
    </OptionStyle>
  ));

  return (
    <ComponentStyle>
      <H3Style>Выбрать колоду:</H3Style>
      <SelectStyle onChange={(e: any) => setLocalDeckName(e.target.value)}>
        <OptionStyle value=" ">Не выбрано</OptionStyle>
        {deckList}
      </SelectStyle>
      <ButtonStyle type="button" onClick={onClick}>
        <span>Подтвердить</span>
      </ButtonStyle>
    </ComponentStyle>
  );
};

export default ChoiceDeck;
