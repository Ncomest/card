import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@/shared/ui/button";
import { getAllDecks } from "../api/api";

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

export const SelectDeck = ({ onClick }: { onClick: () => void }) => {
  const [deck, setDeck] = useState<string[]>([]);
  const [localDeckName, setLocalDeckName] = useState("");

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const data = await getAllDecks();
        setDeck(data);
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
      <SelectStyle onChange={(e) => setLocalDeckName(e.target.value)}>
        <OptionStyle value=" ">Не выбрано</OptionStyle>
        {deckList}
      </SelectStyle>
      <Button type="game" size="xl" onClick={onClick}>
        Подтвердить
      </Button>
    </ComponentStyle>
  );
};
