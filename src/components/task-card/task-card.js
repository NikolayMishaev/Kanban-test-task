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
  currentDropCard,
  empty,
}) {
  const handleCardClick = () => {
    onCardClick({ id, title, description, storyPoints, priority, status });
    changeBreadCrumbs(`${id} ${title}`);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.target.closest(".task-card").style.boxShadow = "0 2px 2px red";
  };

  const handleDragLeave = (e) => {
    e.target.closest(".task-card").style.boxShadow =
      "0px 0px 1px rgba(26, 32, 36, 0.32), 0px 1px 2px rgba(91, 104, 113, 0.32)";
  };

  const handleDragStart = (e) => {
    currentDragCard({
      id,
      title,
      description,
      storyPoints,
      priority,
      status,
      indexCard,
    });
  };

  const handleDragEnd = (e) => {
    e.target.closest(".task-card").style.boxShadow =
      "0px 0px 1px rgba(26, 32, 36, 0.32), 0px 1px 2px rgba(91, 104, 113, 0.32)";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    currentDropCard({
      id,
      title,
      description,
      storyPoints,
      priority,
      status,
      indexCard,
    });

    e.target.closest(".task-card").style.boxShadow =
      "0px 0px 1px rgba(26, 32, 36, 0.32), 0px 1px 2px rgba(91, 104, 113, 0.32)";
  };

  return (
    <li
      className={`task-card ${empty ? "task-card_transparent" : ""}`}
      draggable={!empty}
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
