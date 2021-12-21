import "./form.css";

export default function Form() {
  return (
    <form className="form">
      <input className="form__input" type="text"></input>
      <button className="form__sumbit" type="submit">
        Search
      </button>
    </form>
  );
}
