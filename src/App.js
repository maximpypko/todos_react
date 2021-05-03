import { Component } from "react";

import "./styles.css";
import { InputTodo } from "./InputTodo";
import { ListTodos } from "./ListTodos";
import { Footer } from "./Footer";
import { ToggleTodos } from "./ToggleTodos";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      todoData: [],
      filter: "all"
    };

    this.setFilter = (selectFilter) => {
      this.setState(({ filter }) => {
        const newFilter = selectFilter.replace(filter);
        return {
          filter: newFilter
        };
      });
    };

    this.destroyItem = (id) => {
      this.setState(({ todoData }) => {
        const indexItem = todoData.findIndex((el) => el.id === id);
        const newTodoData = [
          ...todoData.slice(0, indexItem),
          ...todoData.slice(indexItem + 1)
        ];

        return {
          todoData: newTodoData
        };
      });
    };

    this.addItem = (target) => {
      const { value } = target;
      const newTodos = {
        value: value,
        complete: false,
        id: Date.now()
      };

      target.value = "";

      this.setState(({ todoData }) => {
        const newTodoData = [...todoData, newTodos];

        return {
          todoData: newTodoData
        };
      });
    };

    this.isComplete = (id) => {
      this.setState(({ todoData }) => {
        const indexItem = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[indexItem];

        const newItem = { ...oldItem, complete: !oldItem.complete };
        const newTodoData = [
          ...todoData.slice(0, indexItem),
          newItem,
          ...todoData.slice(indexItem + 1)
        ];

        return {
          todoData: newTodoData
        };
      });
    };

    this.clearCompletedItems = () => {
      this.setState(({ todoData }) => {
        const newTodoData = todoData.filter((item) => !item.complete);
        return {
          todoData: newTodoData
        };
      });
    };

    this.toggleAll = ({ checked }) => {
      this.setState(({ todoData }) => {
        const newTodoData = todoData.map((todo) => {
          todo.complete = checked;
          return todo;
        });

        return {
          todoData: newTodoData
        };
      });
    };

    this.onEditItem = (target, id) => {
      target.parentElement.classList.remove("editing");

      if (target.value) {
        this.setState(({ todoData }) => {
          const indexItem = todoData.findIndex((el) => el.id === id);

          const oldItem = todoData[indexItem];
          const newItem = { ...oldItem, value: target.value };

          const newTodoData = [
            ...todoData.slice(0, indexItem),
            newItem,
            ...todoData.slice(indexItem + 1)
          ];

          return {
            todoData: newTodoData
          };
        });
      } else {
        this.setState(({ todoData }) => {
          const indexItem = todoData.findIndex((el) => el.id === id);

          const newTodoData = [
            ...todoData.slice(0, indexItem),
            ...todoData.slice(indexItem + 1)
          ];

          return {
            todoData: newTodoData
          };
        });
      }
    };
  }

  render() {
    const { todoData, filter } = this.state;
    const countTodos = todoData.filter((el) => !el.complete).length;
    const countCompleteTodos = todoData.length - countTodos;

    const filteredTodos = todoData.filter((todo) => {
      switch (filter) {
        case "active":
          return !todo.complete;
        case "completed":
          return todo.complete;
        default:
          return true;
      }
    });

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <InputTodo onAddItem={this.addItem} />
        </header>

        {todoData.length > 0 && (
          <section className="main">
            <ToggleTodos
              toggleAll={this.toggleAll}
              isCompletedAll={todoData.length === countCompleteTodos}
            />
            <ListTodos
              todos={filteredTodos}
              destroyItem={this.destroyItem}
              isComplete={this.isComplete}
              onEditItem={this.onEditItem}
            />
          </section>
        )}

        {todoData.length > 0 && (
          <Footer
            countTodos={countTodos}
            countCompleteTodos={countCompleteTodos}
            clearCompletedItems={this.clearCompletedItems}
            filter={filter}
            setFilter={this.setFilter}
          />
        )}
      </section>
    );
  }
}
