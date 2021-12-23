import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./form.css";

import Button from "../button/button";

export default function Form({
  place,
  newDataCard,
  currentCard = {},
  handleSearchValue,
}) {
  const navigate = useNavigate();

  const [isValid, setIsValid] = useState(currentCard.title || false);

  const [formValues, setFormValues] = useState({
    ...currentCard,
  });

  const handleFields = (e) => {
    const { name, value } = e.target;
    if (name === "storyPoints") {
      if (value < 1 || value > 10) return;
    }
    setFormValues({ ...formValues, [name]: value });
    setIsValid(e.target.closest("form").checkValidity());
  };

  const handleFormSubmitCreateCard = (e) => {
    e.preventDefault();
    newDataCard(formValues);
    navigate("/");
  };

  const handleFormSubmitSearch = (e) => {
    e.preventDefault();
    handleSearchValue(formValues.search);
  };

  return (
    <>
      {place === "search" && (
        <form className="form" onSubmit={handleFormSubmitSearch}>
          <input
            className="form__input search__input"
            type="text"
            name="search"
            value={formValues.search || ""}
            onChange={handleFields}
          ></input>
          <Button name="Search" className="search__button" type="submit" />
        </form>
      )}
      {place === "create-card" && (
        <form
          className="form create-card__form"
          onSubmit={handleFormSubmitCreateCard}
        >
          <input
            className="form__input create-card__input"
            type="text"
            required
            placeholder="Title *"
            onChange={handleFields}
            name="title"
            maxLength={100}
            value={formValues.title || ""}
          ></input>
          <select
            className={`form__select create-card__select ${
              formValues.priority ? "create-card__select_active" : ""
            }`}
            // defaultValue={"Priority"}
            onChange={handleFields}
            name="priority"
            value={formValues.priority || "Priority"}
          >
            <option
              className="form__option create-card__option"
              defaultValue=""
              disabled
              hidden
            >
              Priority
            </option>
            <option className="form__option create-card__option" value="major">
              major
            </option>
            <option className="form__option create-card__option" value="minor">
              minor
            </option>
            <option className="form__option create-card__option" value="normal">
              normal
            </option>
            <option className="form__option create-card__option" value="unkown">
              unkown
            </option>
            <option
              className="form__option create-card__option"
              value="critical"
            >
              critical
            </option>
          </select>
          <input
            className="form__input create-card__input create-card__input_narrow"
            type="number"
            min="1"
            max="10"
            placeholder="Story points"
            onChange={handleFields}
            name="storyPoints"
            value={formValues.storyPoints || ""}
          ></input>
          <select
            className={`form__select create-card__select ${
              formValues.status ? "create-card__select_active" : ""
            }`}
            // defaultValue={"Status"}
            onChange={handleFields}
            name="status"
            value={formValues.status || "Status"}
          >
            <option
              className="form__option create-card__option"
              defaultValue=""
              disabled
              hidden
            >
              Status
            </option>
            <option className="form__option create-card__option" value="to do">
              to do
            </option>
            <option
              className="form__option create-card__option"
              value="in progress"
            >
              in progress
            </option>
            <option className="form__option create-card__option" value="test">
              test
            </option>
            <option className="form__option create-card__option" value="done">
              done
            </option>
          </select>
          <textarea
            className="form__textarea create-card__textarea"
            placeholder="Description"
            onChange={handleFields}
            name="description"
            maxLength={300}
            value={formValues.description || ""}
          ></textarea>
          <Button
            isValid={isValid}
            name="Save"
            className="create-card__button"
            type="submit"
          />
        </form>
      )}
    </>
  );
}
