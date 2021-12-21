import "./task-list.css";

import TaskCard from "../task-card/task-card";

export default function TaskList({prop}) {
  return (
    <div className="task-list">
      <h2 className="task-list__title">{prop.status}</h2>
      <ul className="task-list__list">
        {prop.cards.map(i=>(<TaskCard
        key={i.id}
        prop={i}
        />))}
      </ul>
    </div>
  );
}
