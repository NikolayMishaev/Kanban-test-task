import "./create-card.css";

import Form from "../form/form";

export default function CreateCard({ newDataCard, currentCard }) {
  return (
    <Form
      newDataCard={newDataCard}
      currentCard={currentCard}
      place="create-card"
    />
  );
}
