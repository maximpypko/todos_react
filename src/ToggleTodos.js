export function ToggleTodos({ toggleAll, isCompletedAll }) {
  return (
    <>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={isCompletedAll}
        onChange={(e) => toggleAll(e.target)}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
}
