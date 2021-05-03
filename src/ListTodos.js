import { TodoItem } from "./TodoItem";

export function ListTodos({ todos, destroyItem, isComplete, onEditItem }) {
  const todoItems = todos.map((item) => {
    const { id } = item;

    return (
      <li key={id}>
        <TodoItem
          {...item}
          destroyItem={() => destroyItem(id)}
          isComplete={() => isComplete(id)}
          onEditItem={onEditItem}
        />
      </li>
    );
  });

  return <ul className="todo-list">{todoItems}</ul>;
}
