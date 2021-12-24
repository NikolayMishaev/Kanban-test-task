import { useNavigate } from 'react-router-dom';

import './card.css';

import Button from '../button/button';

export default function Card({ title, description, storyPoints, priority, status, changeBreadCrumbs }) {
  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate('/edit-issue');
    changeBreadCrumbs('Edit issue');
  };

  return (
    <div className="card">
      <h3 className="card__title">{title}</h3>
      <div className={`card__priority card__priority_type_${priority}`}></div>
      <p className="card__story-points">{storyPoints}</p>
      <p className="card__status">{status}</p>
      <Button handleClick={handleClickButton} name="Edit" type="button" className="card__button-edit" />
      <p className="card__description">{description}</p>
    </div>
  );
}
