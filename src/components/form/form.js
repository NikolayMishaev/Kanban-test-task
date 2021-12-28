import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import './form.css';

import Button from '../button/button';
import { ROUTES } from '../../utils/constants';

export default function Form({ place, newDataCard, currentCard = {}, handleSearchValue }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const handleFormSubmitCreateCard = (e) => {
    if (e.priority === 'Priority') e.priority = '';
    if (e.status === 'Status') e.status = 'to do';
    newDataCard({ ...e, id: currentCard.id });
    navigate(ROUTES.root);
  };

  const handleFormSubmitSearch = (e) => {
    handleSearchValue(e.search);
  };

  return (
    <>
      {place === 'search' && (
        <form className="form" onSubmit={handleSubmit(handleFormSubmitSearch)}>
          <input className="form__input search__input" type="text" {...register('search')}></input>
          <Button name="Search" className="search__button" type="submit" />
        </form>
      )}
      {place === 'create-card' && (
        <form className="form create-card__form" onSubmit={handleSubmit(handleFormSubmitCreateCard)}>
          <label className="form__label">
            <input
              className={`form__input create-card__input ${errors?.title?.message && 'form__input_error'}`}
              type="text"
              placeholder="Title *"
              defaultValue={currentCard.title || ''}
              {...register('title', {
                required: { value: true, message: 'Это поле обязательно к заполнению !' },
                maxLength: { value: 100, message: 'Максимальная длина не должна превышать 100 символов !' },
              })}
            ></input>
            <p className="form__error-message">{errors?.title?.message}</p>
          </label>
          <select
            className={`form__select create-card__select ${
              currentCard.priority
                ? 'create-card__select_active'
                : !watch('priority') || watch('priority') === 'Priority'
                ? ''
                : 'create-card__select_active'
            }`}
            defaultValue={currentCard.priority || 'Priority'}
            {...register('priority')}
          >
            <option className="form__option create-card__option" defaultValue="" disabled hidden>
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
            <option className="form__option create-card__option" value="critical">
              critical
            </option>
          </select>
          <label className="form__label">
            <input
              className={`form__input create-card__input create-card__input_narrow ${
                errors?.storyPoints?.message && 'form__input_error'
              }`}
              type="number"
              placeholder="Story points"
              defaultValue={currentCard.storyPoints || ''}
              {...register('storyPoints', {
                min: { value: 1, message: 'Значение не должно быть меньше 1 !' },
                max: { value: 10, message: 'Значение не должно быть больше 10 !' },
                pattern: { value: /^[1-9]/, message: 'Значение не может начинаться с 0 !' },
              })}
            ></input>
            <p className="form__error-message">{errors?.storyPoints?.message}</p>
          </label>
          <select
            className={`form__select create-card__select ${
              currentCard.status
                ? 'create-card__select_active'
                : !watch('status') || watch('status') === 'Status'
                ? ''
                : 'create-card__select_active'
            }`}
            defaultValue={currentCard.status || 'Status'}
            {...register('status')}
          >
            <option className="form__option create-card__option" defaultValue="" disabled hidden>
              Status
            </option>
            <option className="form__option create-card__option" value="to do">
              to do
            </option>
            <option className="form__option create-card__option" value="in progress">
              in progress
            </option>
            <option className="form__option create-card__option" value="test">
              test
            </option>
            <option className="form__option create-card__option" value="done">
              done
            </option>
          </select>
          <label className="form__label">
            <textarea
              className={`form__textarea create-card__textarea ${
                errors?.description?.message && 'form__textarea_error'
              }`}
              placeholder="Description"
              defaultValue={currentCard.description || ''}
              {...register('description', {
                maxLength: { value: 300, message: 'Максимальная длина не должна превышать 300 символов !' },
              })}
            ></textarea>
            <p className="form__error-message">{errors?.description?.message}</p>
          </label>
          <Button isValid={errors} name="Save" className="create-card__button" type="submit" />
        </form>
      )}
    </>
  );
}
