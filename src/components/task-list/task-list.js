import "./task-list.css";

import TaskCard from "../task-card/task-card";

export default function TaskList({
  onCardClick,
  status,
  cards,
  changeBreadCrumbs,
  currentDragCard,
  currentDropCard,
}) {
  return (
    <div className="task-list">
      <h2 className="task-list__title">{status}</h2>
      <ul className="task-list__list">
      <TaskCard
            key={"zero"}
            empty={true}
            status={status}
            currentDragCard={currentDragCard}
            currentDropCard={currentDropCard}
          />
        {
          cards.map((i, c) => (
            <TaskCard
              key={i.id}
              {...i}
              onCardClick={onCardClick}
              status={status}
              changeBreadCrumbs={changeBreadCrumbs}
              indexCard={c}
              currentDragCard={currentDragCard}
              currentDropCard={currentDropCard}
            />
          ))
}
      </ul>
    </div>
  );
}
