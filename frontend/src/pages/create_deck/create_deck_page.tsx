import styled from "styled-components";
import OptionsList from "../../components/options_list/options_list";
import { StyledButton } from "../../style/global.style";
import { fetchApi } from "../../helper/fetchApi";
import { useEffect, useState } from "react";
import { ICard } from "../home/home";
import CardInCreateDeck from "../../components/card_in_create_deck/card_in_create_deck";

const ComponentStyle = styled.div`
  background: #0b0b0b;
  display: flex;
  padding: 10px;
  color: #bebebe;
`;

const LeftSideStyle = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  gap: 30px;
`;

const RightSideStyle = styled.div`
  width: 25%;
  height: 100dvh;
  position: fixed;
  right: 0;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputStyle = styled.input`
  background: #bebebe;
  padding: 5px 10px;
  outline: none;
  border-radius: 5px;
  font-size: 16px;
  width: 100%;
`;

const OptionsStyle = styled.div`
  display: flex;
  gap: 10px;
  margin: 0 auto;
`;

const GridStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
`;

const CardStyle = styled.div`
  border-radius: 10px;
  height: 280px;
  margin-bottom: 15px;
`;

const ButtonStyle = styled(StyledButton)``;

const PagesContainerStyle = styled.div`
  margin: 0 auto;
`;

const CardBarContainerStyle = styled.div`
  padding: 5px;
  background-color: #737373;
  overflow-y: scroll;
  scroll-behavior: smooth;
  height: 80dvh;
  scrollbar-color: #47475c #e0e0e0;
  scrollbar-width: thin;
`;

const CardBarStyle = styled.div`
  height: 30px;
  border: 1px solid #bebebe;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const BtnContainer = styled.div`
  text-align: center;
`;

type TCards = {
  cards: ICard[];
  page: string;
  pages: string;
  total: string;
};

export const CreateDeckPage = () => {
  const [cardsData, setCardsData] = useState<TCards>() || [];
  const [page, setPage] = useState(1);
  const [newDeck, setNewDeck] = useState<ICard[]>([])

  const totalPages = Number(cardsData?.pages);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await fetchApi({
          API_URI: `/api/create-new-deck/v1/all-cards?page=${page}&limit=20`,
        });
        setCardsData(data);
      } catch (error) {
        console.error("Ошибка при получении карт:", error);
      }
    };

    fetchCards();
  }, [page,setCardsData]);
  // console.log(cardsData);

  //===========LeftSide_start============>//
  function mappingFn(arr: number[] | string []): JSX.Element[] {
    //возвращает jsx разметку из массива
    return arr.map((el, i) => (
      <option key={el} value={el}>
        {el}
      </option>
    ));
  }

  //==============Массивы сортировочного списка==========>//
  const coins = Array.from({ length: 10 }, (_, i) => i + 1); // список монеток от 1-10
  const optionsCoins = mappingFn(coins);

  const cardType = ["golden", "silver"]; // тип монеток
  const optionsType = mappingFn(cardType);

  const cardElement = ["steppe", "neutral", "shadow", "swamp", "mountain"]; // тип елемента
  const optionsElement = mappingFn(cardElement);
  //>==============Массивы сортировочного списка==============//

  const deck = 
    cardsData?.cards.map(el => 
      <CardStyle key={el._id}>
        <CardInCreateDeck card={el} setNewDeck={setNewDeck}/>
      </CardStyle>);
  //>===========LeftSide_end============//



  //===========RightSide_start============>//
  const rightCardListMap = newDeck.map((el, i) => (
    <CardBarStyle key={i}>{el.name}</CardBarStyle> //TODO создать компонент с данными
  ));
  //>===========RightSide_end============//


  //===========Button_inc&dec============>//
  const increment = () => {
    setPage(prev => prev + 1);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  const decrement = () => {
    setPage(prev => prev - 1)
  }
  //>===========Button_inc&dec============//




    


  return (
    <ComponentStyle>
      <LeftSideStyle>
        <InputStyle type="text" placeholder="Введите название карты" />
        <OptionsStyle>
          <OptionsList value={optionsCoins} text="сортировать по стоймости" />
          <OptionsList value={optionsType} text="сортировать по типу" />
          <OptionsList value={optionsElement} text="сортировать по елементу" />
        </OptionsStyle>
        <GridStyle>{deck}</GridStyle>
        <PagesContainerStyle>
          {page >= 2 && <ButtonStyle onClick={decrement}><span>назад</span></ButtonStyle>}
          {page}{" из "}{totalPages}
          {page < totalPages && <ButtonStyle onClick={increment}><span>вперед</span></ButtonStyle>}
        </PagesContainerStyle>
      </LeftSideStyle>

      <RightSideStyle>
        <CardBarContainerStyle>{rightCardListMap}</CardBarContainerStyle>
        <InputStyle type="text" placeholder="Введите название колоды" />
        <BtnContainer>
          <ButtonStyle><span>сброс</span></ButtonStyle>
          <ButtonStyle><span>сохранить</span></ButtonStyle>
        </BtnContainer>
      </RightSideStyle>
    </ComponentStyle>
  );
};
