export function InputTodo({ onAddItem }) {
  const onKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value) onAddItem(e.target);
  };

  const onBlur = ({ target }) => {
    if (target.value) onAddItem(target);
  };

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
}
