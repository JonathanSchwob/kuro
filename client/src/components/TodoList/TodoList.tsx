import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { useTodoStore } from "../../store/todoStore";
import { useEffect } from "react";
import dayjs from "dayjs";

function msUntilNextMidnight() {
  return dayjs().endOf("day").add(1, "millisecond").diff(dayjs());
}

export default function TodoList() {
  const { todos, addTodo, toggleTodoComplete, deleteTodo, pruneCompleted } =
    useTodoStore();

  useEffect(() => {
    // Immediate prune on mount
    pruneCompleted();

    // Schedule daily pruning at midnight
    const schedulePrune = () => {
      const timeout = setTimeout(() => {
        pruneCompleted();
        schedulePrune(); // schedule next day
      }, msUntilNextMidnight());

      return () => clearTimeout(timeout);
    };

    const cleanup = schedulePrune();
    return cleanup;
  }, [pruneCompleted]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold mb-4 text-right">Kuro</h1>
      <TodoInput addTodo={addTodo} />
      <ul className="space-y-2">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
