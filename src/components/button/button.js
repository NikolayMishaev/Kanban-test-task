import "./button.css";

export default function Button({
  name,
  className,
  type,
  handleClick,
  isValid = true,
}) {
  return (
    <button
      className={`button ${className} ${isValid ? "" : "button_disabled"}`}
      type={type}
      onClick={handleClick}
    >
      {name}
    </button>
  );
}
