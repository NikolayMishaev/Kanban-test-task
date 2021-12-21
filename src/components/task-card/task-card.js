import './task-card.css'

export default function TaskCard({prop}) {
  const {id, title, subtitle, storyPoints, priority} = prop;
  return (
    <li className="task-card">
      <h3 className="task-card__title">{title}</h3>
      <p className="task-card__subtitle">{subtitle}</p>
      <div className={`task-card__priority task-card__priority_type_${priority}`}></div>
      <p className="task-card__story-points">{storyPoints}</p>
      <p className="task-card__id">{id}</p>
    </li>
  );
}
