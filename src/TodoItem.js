import { Component } from "react";

export class TodoItem extends Component {
  constructor() {
    super();

    this.editItem = ({ target }) => {
      target.parentElement.parentElement.classList.add("editing");
      target.parentElement.nextElementSibling.focus();
    };

    this.onKeyDown = (e) => {
      if (e.key === "Enter" && e.target.value)
        this.props.onEditItem(e.target, this.props.id);
    };

    this.onBlur = ({ target }) => {
      if (target.value) this.props.onEditItem(target, this.props.id);
    };
  }

  render() {
    const { value, complete, destroyItem, isComplete } = this.props;

    return (
      <span className={complete ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={complete ? true : false}
            onChange={isComplete}
          />
          <label onDoubleClick={(e) => this.editItem(e)}>{value}</label>
          <button className="destroy" onClick={destroyItem}>
            {" "}
          </button>
        </div>
        <input
          type="text"
          className="edit"
          defaultValue={value}
          onKeyDown={this.onKeyDown}
          onBlur={this.onBlur}
          autoFocus
        />
      </span>
    );
  }
}
