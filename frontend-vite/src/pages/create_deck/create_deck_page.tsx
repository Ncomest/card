import styled from "styled-components";
import OptionsList from "../../components/options_list/options_list";
import { fetchApi } from "../../helper/fetchApi";
import { useEffect, useRef, useState } from "react";
import type { ICard } from "@/types/types";
import CardInCreateDeck from "../../components/card_in_create_deck/card_in_create_deck";
import CardListInCreateDeck from "../../components/card_list_in_create_deck/card_list_in_create_deck";
import ButtonDarkStone from "../../components/button/button_dark_stone";
import { StyledButton } from "../../style/global.style";
import { Link } from "react-router-dom";

const ComponentStyle = styled.div`
  background: var(--primary-color);
  display: flex;
  /* padding: 10px; */
  color: #bebebe;
  min-height: 100dvh;
`;

const LeftSideStyle = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-right: 350px;
  padding: 10px;
  gap: 30px;
  background-color: var(--primary-color);
`;

const RightSideStyle = styled.div`
  width: 350px;
  height: 100dvh;
  position: fixed;
  padding: 10px 10px 10px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background: var(--primary-color);
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
  border-radius: 5px;
  justify-content: space-between;
  background: var(--secondary-color);
  width: 100%;
  padding: 10px 5px;
`;

const GridStyle = styled.div`
  display: grid;
  flex: 1;
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
  background: var(--secondary-color);
  padding: 15px 5px;
  border-radius: 5px;
`;

const CardStyle = styled.div`
  border-radius: 10px;
  filter: brightness(90%);
  
  &:hover {
    filter: brightness(110%);
  }
`;

const PagesContainerStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 15px 0;
  flex: 0;
  width: 100%;
  border-radius: 5px;
  background: var(--secondary-color);
`;

const CardBarContainerStyle = styled.div`
  padding: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: auto;
  scroll-behavior: smooth;
  height: 80dvh;
  scrollbar-color: #47475c #e0e0e0;
  scrollbar-width: thin;
  background-color: #303030;
  border-radius: 5px;
`;

const BtnContainer = styled.div`
  border-radius: 5px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  text-align: center;
  background-color: #303030;
  flex: 0;
  padding: 15px 20px;
`;

const BtnSaveDeckStyle = styled(StyledButton)<{ $isDisabled: boolean}>`
  pointer-events: ${(props) => (props.$isDisabled? "none" : 'auto')};
  opacity: ${(props) => (props.$isDisabled ? "0.5" : '1')};

  &:hover {
    scale: ${(props) => (props.$isDisabled && '1')};
  };
`;

type TCards = {
  cards: ICard[];
  page?: string;
  pages?: string;
  total?: string;
};

export const CreateDeckPage = () => {
  const [cardsData, setCardsData] = useState<TCards>() || [];
  const [page, setPage] = useState(1);
  const [newDeck, setNewDeck] = useState<ICard[]>([]) || [];
  const [inputCardFind, setInputCardFind] = useState("");
  const [debounceInput, setDebounceInput] = useState("");
  const [deckName, setDeckName] = useState('')

  const [ dropdownFilter, setDropdownFilter] = useState({
    cardCoins: "",
    cardType: "",
    cardElement: ""
  })

  const deckRef = useRef<HTMLDivElement>(null);

  const totalPages = Number(cardsData?.pages);

  useEffect(() => {
    const handleInput = setTimeout(() => setDebounceInput(inputCardFind),1500)

    return () => clearTimeout(handleInput)
  }, [inputCardFind]);

  useEffect(() => {

    const fetchCards = async () => {
      try {
        let data;

        const query = new URLSearchParams({
          ...dropdownFilter,
          cardName: debounceInput || "",
          page: page.toString(),
          limit: '20'
        })

        data = await fetchApi({
          API_URI: `/api/create-new-deck/v1/cards?${query}`,
        });
        
        setCardsData(data);
      } catch (error) {
        console.error("Ошибка при получении карт:", error);
      }
    };

    fetchCards();
  }, [page, setCardsData, debounceInput, dropdownFilter]);

  //===========LeftSide_start============>//


  //==============Массивы сортировочного списка==========>//
  const coins = Array.from({ length: 10 }, (_, i) => i + 1); // список монеток от 1-10

  const cardType = ["golden", "silver"]; // тип монеток
  const cardTypeRu = ["золотые", "серебрянные"]; // тип монеток

  const cardElement = ["steppe", "neutral", "shadow", "swamp", "mountain"]; // тип елемента
  const cardElementRu = ["степные", "нейтральные", "темные", "болотные", "горные"]; // тип елемента

  const handleDropdownFilter = (name: string, value: string) => {
    setPage(1);
    setDropdownFilter((prev:any) => ({...prev, [name]: value}));
  }
  
  //>==============Массивы сортировочного списка==============//

  // Добавить карту в колоду
  const addCard = (el: ICard) => {
    if(newDeck.length < 30) {
 
      setNewDeck((prev: ICard[]) => {
        const count = prev.filter((c: ICard) => c._id === el._id).length;
        
        // не допускает превыщения набора карт выше 3 одиннаковых
        if (count < 3) {
          return [...prev, el];
        }
  
        return prev;
      });
    }else{
      console.log('Количество карт в колоде не может превышать 30 карт') // TODO вывести на экран
    }
  };

  useEffect(() => {
    if(deckRef.current) {
      deckRef.current.scrollTop = deckRef.current.scrollHeight;
    }
  }, [newDeck])
  

  // удаление карты из набранной колоды
  const delCard = (i: number) => {
    setNewDeck((prev) => prev.filter((_, index) => i !== index))  
  }

  const deck = cardsData?.cards.map((el) => (
    <CardStyle key={el._id}>
      <CardInCreateDeck card={el} addCard={addCard} />
    </CardStyle>
  ));
  //>===========LeftSide_end============//

  //===========RightSide_start============>//
  const rightCardListMap = newDeck.map((el, i) => (
    <CardListInCreateDeck key={i} deckList={el} index={i} onClick={delCard}/>
  ));
  //>===========RightSide_end============//

  //===========Button_inc&dec============>//
  const incrementPage = () => {
    setPage((prev) => prev + 1);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const decrementPage = () => setPage(prev => prev - 1);
  //>===========Button_inc&dec============//

  //===========Button_Save&Reset_Deck============>//

  const fetchSaveNewDeck = async () => {
    try {
      // if(deckName.length <= 3 || newDeck.length <= 3) {
        const data = await fetchApi({
          API_URI: "/api/create-new-deck/v1/create", 
          method: "POST", 
          body: {
          deckName: deckName,
          deckArr : newDeck,
        }
      })
        console.log('создана новая колода', data);
      // }
    } catch (error) {
      console.error("Error",error);
    }
  };

  const handleResetDeck = () => setNewDeck([]);
  //>==========Button_Save&Reset_Deck============//



  return (
    <ComponentStyle>
      <LeftSideStyle>
        <Link to="/">
          <StyledButton><span>← назад</span></StyledButton>
        </Link>
        <InputStyle 
          type="text"
          placeholder="Введите название карты" 
          value={inputCardFind}
          onChange={(e:any) => {
            setPage(1);
            setInputCardFind(e.target.value)
          }}
          />

        <OptionsStyle>
          <OptionsList 
            arr={coins}
            onChange={handleDropdownFilter}
            name="cardCoins"
            dropdownFilter={dropdownFilter.cardCoins} 
            text="сортировать по стоимости" />
          <OptionsList 
            arr={cardType}
            onChange={handleDropdownFilter}
            name="cardType"
            local={cardTypeRu}
            dropdownFilter={dropdownFilter.cardType} 
            text="сортировать по типу" />
          <OptionsList 
            arr={cardElement}
            onChange={handleDropdownFilter}
            name="cardElement"
            local={cardElementRu}
            dropdownFilter={dropdownFilter.cardElement} 
            text="сортировать по элементу" />
        </OptionsStyle>

        <GridStyle>{deck}</GridStyle>

        <PagesContainerStyle>
          {page >= 2 && <ButtonDarkStone text={"назад"} onClick={decrementPage} />}
          <p>{page}{" из "}{totalPages}</p>
          {page < totalPages && (<ButtonDarkStone text={"вперед"} onClick={incrementPage} />)}
        </PagesContainerStyle>
      </LeftSideStyle>

      <RightSideStyle>
        <CardBarContainerStyle ref={deckRef}>{rightCardListMap}</CardBarContainerStyle>

        <BtnContainer>
          <InputStyle 
            type="text" 
            placeholder="Введите название колоды" 
            onChange={(e: any) => setDeckName(e.target.value)}
            value={deckName}
            />
          <BtnSaveDeckStyle 
            $isDisabled={newDeck.length < 3 || deckName.length < 3}
            onClick={fetchSaveNewDeck}>
            <span>сохранить</span>
          </BtnSaveDeckStyle>
          <ButtonDarkStone text={"сброс"} onClick={handleResetDeck}/>
        </BtnContainer>
      </RightSideStyle>
    </ComponentStyle>
  );
};
