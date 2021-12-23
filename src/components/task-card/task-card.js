import { Link } from "react-router-dom";

import "./task-card.css";

export default function TaskCard({
  id,
  title,
  description,
  storyPoints,
  priority,
  onCardClick,
  status,
  changeBreadCrumbs
}) {
  const handleCardClick = () => {
    onCardClick({ id, title, description, storyPoints, priority, status });
    changeBreadCrumbs(title)
  };
  return (
    <li className="task-card">
      <Link className="task-card__link" to="/card" onClick={handleCardClick}>
      <h3 className="task-card__title">{title}</h3>
      </Link>
      <p className="task-card__description">{description}</p>
      <div
        className={`task-card__priority task-card__priority_type_${priority}`}
      ></div>
      <p className="task-card__story-points">{storyPoints}</p>
      <p className="task-card__id">{id}</p>
    </li>
  );
}
