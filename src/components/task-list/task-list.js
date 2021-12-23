import "./task-list.css";

import TaskCard from "../task-card/task-card";

export default function TaskList({ onCardClick, status, cards, changeBreadCrumbs}) {
  return (
    <div className="task-list">
      <h2 className="task-list__title">{status}</h2>
      <ul className="task-list__list">
        {cards.map(i=>(<TaskCard
        key={i.id}
        {...i}
        onCardClick={onCardClick}
        status={status}
        changeBreadCrumbs={changeBreadCrumbs}
        />))}
      </ul>
    </div>
  );
}
