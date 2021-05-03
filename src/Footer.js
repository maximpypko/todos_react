import { Component } from "react";

export class Footer extends Component {
  render() {
    const {
      countTodos,
      countCompleteTodos,
      clearCompletedItems,
      filter,
      setFilter
    } = this.props;

    const handleFilter = (e, filter) => {
      e.preventDefault();
      setFilter(filter);
    };
    const changeClassName = (className) => {
      return filter === className ? "selected" : "";
    };
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{countTodos}</strong>
          items left
        </span>
        <ul className="filters">
          <li>
            <a
              href="/"
              className={changeClassName("all")}
              onClick={(e) => handleFilter(e, "all")}
            >
              All
            </a>
          </li>
          <li>
            <a
              href="/active"
              className={changeClassName("active")}
              onClick={(e) => handleFilter(e, "active")}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="/completed"
              className={changeClassName("completed")}
              onClick={(e) => handleFilter(e, "completed")}
            >
              Completed
            </a>
          </li>
        </ul>
        {countCompleteTodos > 0 && (
          <button className="clear-completed" onClick={clearCompletedItems}>
            Clear completed
          </button>
        )}
      </footer>
    );
  }
}
