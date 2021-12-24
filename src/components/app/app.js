import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

import './app.css';

import { DATA_BOARDS } from '../../utils/constants';
import BreadCrumbs from '../bread-crumbs/bread-crumbs';
import Title from '../title/title';
import Form from '../form/form';
import TaskList from '../task-list/task-list';
import Button from '../button/button';
import Card from '../card/card';
import CreateCard from '../create-card/create-card';

export default function App() {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');

  const [currentDragCard, setCurrentDragCard] = useState({});
  const [currentDropCard, setCurrentDropCard] = useState({});

  const [data, setData] = useState(DATA_BOARDS);

  const [currentCard, setCurrentCard] = useState({});

  const [currentBreadCrumbs, setCurrentBreadCrumbs] = useState('');

  useEffect(() => {
    if (currentDragCard.id && currentDropCard.status) {
      changeOrderCards();
    } else if (currentDropCard.status) {
      setCurrentDropCard({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDragCard, currentDropCard]);

  const changeBreadCrumbs = (value) => {
    setCurrentBreadCrumbs(value);
  };

  const onCardClick = (card) => {
    setCurrentCard((state) => card);
  };

  const handleClickNewIssue = () => {
    navigate('/new-issue');
    setCurrentBreadCrumbs('New issue');
  };

  const addNewCard = ({ id = nanoid(5), title, description, priority, storyPoints, status = 'to do' }) => {
    setData((state) =>
      state.map((i) => {
        if (i.status === status) {
          return {
            ...i,
            cards: [...i.cards, { id, title, description, priority, storyPoints }],
          };
        } else return i;
      })
    );
    changeBreadCrumbs('');
  };

  const handleSearchValue = (searchValue = '') => {
    setSearchValue(searchValue.toLowerCase());
  };

  const filterCards = () => {
    if (searchValue) {
      return data.map((i) => ({
        id: i.id,
        status: i.status,
        cards: i.cards.filter(
          (j) => j.id.toLowerCase().includes(searchValue) || j.title.toLowerCase().includes(searchValue)
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
    changeBreadCrumbs('');
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
          const newCards = i.cards.map((j) => (j.id === card.id ? { ...card } : j));
          return { ...i, cards: newCards };
        } else return i;
      })
    );
    changeBreadCrumbs('');
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
          if (currentCards.length && !currentDropCard.id) {
            newCards = [...currentCards.slice(0, currentDropCard.indexCard), currentDragCard];
          } else {
            newCards = [
              ...currentCards.slice(0, currentDropCard.indexCard),
              currentDragCard,
              ...currentCards.slice(currentDropCard.indexCard),
            ];
          }
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
      <BreadCrumbs currentBreadCrumbs={currentBreadCrumbs} changeBreadCrumbs={changeBreadCrumbs} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <section className="heading">
                <Title title="Issue Boards" />
                <Button handleClick={handleClickNewIssue} name="New issue" type="button" className="heading__button" />
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
        <Route path="/card" element={<Card {...currentCard} changeBreadCrumbs={changeBreadCrumbs} />} />
        <Route path="/new-issue" element={<CreateCard newDataCard={addNewCard} />} />
        <Route path="/edit-issue" element={<CreateCard newDataCard={editCard} currentCard={currentCard} />} />
      </Routes>
    </main>
  );
}
