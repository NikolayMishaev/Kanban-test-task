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

  const [currentDragCard, setCurrentDragCard] = useState({})
  const [currentDropCard, setCurrentDropCard] = useState({})

  const [data, setData] = useState([
    {
      id: 1,
      status: "to do",
      cards: [
        {
          id: "FC-7",
          title: "Задача № 1",
          description:
            "As a translator, I want integrate Crowdin webhook to notify translators about changed strings",
          storyPoints: 2,
          priority: "major",
        },
        {
          id: "BC–14",
          title: "Задача № 2",
          description:
            "As a translator, I want integrate Crowdin webhook to notify translators about changed strings",
          storyPoints: 2,
          priority: "unkown",
        },
        {
          id: "BC–11",
          title: "Задача № 3",
          description:
            "As a translator, I want integrate Crowdin webhook to notify translators about changed strings",
          storyPoints: 2,
          priority: "unkown",
        },
        {
          id: "FC-9",
          title: "Задача № 4",
          description:
            "As a translator, I want integrate Crowdin webhook to notify translators about changed strings",
          storyPoints: 2,
          priority: "critical",
        },
        {
          id: "FC-8",
          title: "Задача № 5",
          description:
            "As a translator, I want integrate Crowdin webhook to notify translators about changed strings",
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
          description: "Описание задачи 2",
          storyPoints: 3,
          priority: "major",
        },
        {
          id: "MAR-11",
          title: "Задача № 7",
          description: "Описание задачи 2",
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
          description: "Описание задачи 2",
          storyPoints: 3,
          priority: "minor",
        },
        {
          id: "MAR-13",
          title: "Задача № 9",
          description: "Описание задачи 2",
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
          description: "Описание задачи 2",
          storyPoints: 3,
          priority: "minor",
        },
        {
          id: "MAR-15",
          title: "Задача № 11",
          description: "Описание задачи 2",
          storyPoints: 3,
          priority: "normal",
        },
      ],
    },
  ]);

  const [currentCard, setCurrentCard] = useState({
    id: "MAR-15",
    title: "Задача № 12",
    description: "Описание задачи 2",
    storyPoints: 3,
    priority: "normal",
    status: "done",
  });

  const [currentBreadCrumbs, setCurrentBreadCrumbs] = useState("");

  useEffect(() => {
if (currentDropCard.id && currentDropCard.id) {
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
    setSearchValue(searchValue);
  };

  const filterCards = () => {
    if (searchValue) {
      return data.map((i) => ({
        id: i.id,
        status: i.status,
        cards: i.cards.filter(
          (j) => j.id.includes(searchValue) || j.title.includes(searchValue)
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
  setData((state) =>
  state.map((i) => {
    if (i.status === currentDragCard.status) {
      const newCards = i.cards.map((j) =>
        j.id === currentDragCard.id ? { ...currentDropCard } : j
      );
      console.log(newCards)
      return { ...i, cards: newCards };
    } else     if (i.status === currentDropCard.status) {
      const newCards = i.cards.map((j) =>
        j.id === currentDropCard.id ? { ...currentDragCard } : j
      );
      return { ...i, cards: newCards };
    } else return i;
  })
);
setCurrentDragCard({})
setCurrentDropCard({})
}

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
                    changeOrderCards={changeOrderCards}
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
