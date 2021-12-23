import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import "./app.css";

import BreadCrumbs from "../bread-crumbs/bread-crumbs";
import Title from "../title/title";
import Form from "../form/form";
import TaskList from "../task-list/task-list";
import Button from "../button/button";
import Card from "../card/card";
import CreateCard from "../create-card/create-card";

export default function App() {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const [currentDragCard, setCurrentDragCard] = useState({});
  const [currentDropCard, setCurrentDropCard] = useState({});

  const [data, setData] = useState([
    {
      id: 1,
      status: "to do",
      cards: [
        {
          id: "FC-7",
          title: "Задача № 1",
          description:
            "При поиске при отсутствии результата, выводить сообщение с текстом: 'по указанному запросу данные не найдены' ",
          storyPoints: 2,
          priority: "major",
        },
        {
          id: "BC–14",
          title: "Задача № 2",
          description: "Добавить ф-ию дебоунс к поиску и к драг дропу",
          storyPoints: 2,
          priority: "unkown",
        },
        {
          id: "BC–11",
          title: "Задача № 3",
          description:
            "Добавить возможность добавления задачи в конец при перетаскивании",
          storyPoints: 2,
          priority: "unkown",
        },
        {
          id: "FC-9",
          title: "Задача № 4",
          description: "Сделать возможным добавления задачи в пустой контейнер",
          storyPoints: 2,
          priority: "critical",
        },
        {
          id: "FC-8",
          title: "Задача № 5",
          description:
            "При редактировании данных карточки, если менять статус, то ничего не происходит. Нужно удалить из контейнера с текущим статусом и добавить в контейнер с новым статусом",
          storyPoints: 2,
          priority: "major",
        },
      ],
    },
    {
      id: 2,
      status: "in progress",
      cards: [
        {
          id: "MAR-10",
          title: "Задача № 6",
          description: "Доработать внешний вид компонента просмотра карточки",
          storyPoints: 3,
          priority: "major",
        },
        {
          id: "MAR-11",
          title: "Задача № 7",
          description: "Стилизовать селекты",
          storyPoints: 3,
          priority: "unkown",
        },
      ],
    },
    {
      id: 3,
      status: "test",
      cards: [
        {
          id: "MAR-12",
          title: "Задача № 8",
          description: "Добавить кастомную валидацию полей",
          storyPoints: 3,
          priority: "minor",
        },
        {
          id: "MAR-13",
          title: "Задача № 9",
          description:
            "Создать стейт для хлебных крошек, передавать текущий путь",
          storyPoints: 3,
          priority: "major",
        },
      ],
    },
    {
      id: 4,
      status: "done",
      cards: [
        {
          id: "MAR-14",
          title: "Задача № 10",
          description: "При поиске не учитывать регистр",
          storyPoints: 3,
          priority: "minor",
        },
        {
          id: "MAR-15",
          title: "Задача № 11",
          description:
            "При драг дропе, установить тень текущего элемента через closest, чтобы она не пропадала при наведении на элемент карточки",
          storyPoints: 3,
          priority: "normal",
        },
        {
          id: "MAR-20",
          title: "Задача № 12",
          description:
            "Временной решение с уникальным айди, найти библиотеку с генерацией уникальных ключей",
          storyPoints: 4,
          priority: "major",
        },
        {
          id: "MAR-21",
          title: "Задача № 13",
          description: "Фильтрация через новый стейт или динамическая",
          storyPoints: 3,
          priority: "critical",
        },
        {
          id: "MAR-22",
          title: "Задача № 14",
          description: "Добавить возможность удаления карточек",
          storyPoints: 2,
          priority: "minor",
        },
      ],
    },
  ]);

  const [currentCard, setCurrentCard] = useState({});

  const [currentBreadCrumbs, setCurrentBreadCrumbs] = useState("");

  useEffect(() => {
    if (currentDropCard.status && currentDropCard.status) {
      changeOrderCards();
    }
  }, [currentDragCard, currentDropCard]);

  const changeBreadCrumbs = (value) => {
    setCurrentBreadCrumbs(value);
  };

  const onCardClick = (card) => {
    setCurrentCard((state) => card);
  };

  const handleClickNewIssue = () => {
    navigate("/new-issue");
    setCurrentBreadCrumbs("New issue");
  };

  const addNewCard = ({
    id = Math.floor(Math.random() * 1000000) + "",
    title,
    description,
    priority,
    storyPoints,
    status = "to do",
  }) => {
    setData((state) =>
      state.map((i) => {
        if (i.status === status) {
          return {
            ...i,
            cards: [
              ...i.cards,
              { id, title, description, priority, storyPoints },
            ],
          };
        } else return i;
      })
    );
    changeBreadCrumbs("");
  };

  const handleSearchValue = (searchValue) => {
    setSearchValue(searchValue.toLowerCase());
  };

  const filterCards = () => {
    if (searchValue) {
      return data.map((i) => ({
        id: i.id,
        status: i.status,
        cards: i.cards.filter(
          (j) =>
            j.id.toLowerCase().includes(searchValue) ||
            j.title.toLowerCase().includes(searchValue)
        ),
      }));
    } else return data;
  };

  const deleteCard = (id) => {
    setData((state) =>
      state.map((i) => {
        if (i.status === currentCard.status) {
          return { ...i, cards: i.cards.filter((i) => i.id !== id) };
        } else return i;
      })
    );
    changeBreadCrumbs("");
  };

  const editCard = (card) => {
    if (card.status !== currentCard.status) {
      deleteCard(card.id);
      addNewCard({ ...card });
      return;
    }
    setData((state) =>
      state.map((i) => {
        if (i.status === card.status) {
          const newCards = i.cards.map((j) =>
            j.id === card.id ? { ...card } : j
          );
          return { ...i, cards: newCards };
        } else return i;
      })
    );
    changeBreadCrumbs("");
  };

  const changeOrderCards = () => {
    if (currentDropCard.id === currentDragCard.id) {
      setCurrentDragCard({});
      setCurrentDropCard({});
      return;
    }
    setData((state) =>
      state.map((i) => {
        let newCards;
        if (i.status === currentDragCard.status) {
          newCards = i.cards.filter((j) => j.id !== currentDragCard.id);
          if (i.status !== currentDropCard.status)
            return {
              ...i,
              cards: newCards,
            };
        }
        if (i.status === currentDropCard.status) {
          const currentCards = newCards || i.cards;
          // const lastCard = currentDropCard.indexCard === currentCards.length-1 ? 1 : 0;
          newCards = [
            ...currentCards.slice(0, currentDropCard.indexCard),
            currentDragCard,
            ...currentCards.slice(currentDropCard.indexCard),
          ];
          return { ...i, cards: [...newCards] };
        } else return i;
      })
    );
    setCurrentDragCard({});
    setCurrentDropCard({});
  };

  const visibleData = filterCards();

  return (
    <main className="App">
      <BreadCrumbs
        currentBreadCrumbs={currentBreadCrumbs}
        changeBreadCrumbs={changeBreadCrumbs}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <section className="heading">
                <Title title="Issue Boards" />
                <Button
                  handleClick={handleClickNewIssue}
                  name="New issue"
                  type="button"
                  className="heading__button"
                />
              </section>
              <section className="search">
                <Form place="search" handleSearchValue={handleSearchValue} />
              </section>
              <section className="task-container">
                {visibleData.map((i) => (
                  <TaskList
                    key={i.id}
                    {...i}
                    onCardClick={onCardClick}
                    changeBreadCrumbs={changeBreadCrumbs}
                    currentDragCard={setCurrentDragCard}
                    currentDropCard={setCurrentDropCard}
                  />
                ))}
              </section>
            </>
          }
        ></Route>
        <Route
          path="/card"
          element={
            <Card {...currentCard} changeBreadCrumbs={changeBreadCrumbs} />
          }
        />
        <Route
          path="/new-issue"
          element={<CreateCard newDataCard={addNewCard} />}
        />
        <Route
          path="/edit-issue"
          element={
            <CreateCard newDataCard={editCard} currentCard={currentCard} />
          }
        />
      </Routes>
    </main>
  );
}
