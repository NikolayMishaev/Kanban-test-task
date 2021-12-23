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
  changeBreadCrumbs,
  indexCard,
  currentDragCard, 
  currentDropCard
}) {

  const handleCardClick = () => {
    onCardClick({ id, title, description, storyPoints, priority, status });
    changeBreadCrumbs(title)
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if(e.target.className === 'task-card') e.target.style.boxShadow = '0 2px 2px red' 
  }

  const handleDragLeave = (e) => {
    e.target.style.boxShadow = 'none' 
  }

  const handleDragStart = (e) => {
    currentDragCard({ id, title, description, storyPoints, priority, status ,indexCard })
  }

  const handleDragEnd = (e) => {
    e.target.style.boxShadow = 'none' 
  }

  const handleDrop = (e) => {
    e.preventDefault();
    currentDropCard({ id, title, description, storyPoints, priority, status ,indexCard })
  }

  return (
    <li className="task-card" draggable={true}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDragStart={handleDragStart}
    onDragEnd={handleDragEnd}
    onDrop={handleDrop}
    >
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
