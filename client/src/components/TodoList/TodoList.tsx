import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { useTodoStore } from "../../store/todoStore";
import { useEffect } from "react";

export default function TodoList() {
  const { todos, addTodo, toggleTodoComplete, deleteTodo, pruneCompleted } =
    useTodoStore();

  useEffect(() => {
    pruneCompleted(); // move old completed todos into completedHistory on mount
  }, [pruneCompleted]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-right">Kuro</h1>
      <TodoInput addTodo={addTodo} />
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleTodoComplete}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}
