import clsx from "clsx";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function TodoItem({ todo, toggleComplete, deleteTodo }) {
  return (
    <li
      className={clsx(
        "p-3 border border-gray-200 rounded-2xl cursor-pointer shadow-sm flex justify-between items-center group truncate max-w-full",
        "hover:bg-blue-100",
        todo.completed ? "line-through text-gray-400 bg-gray-100" : "bg-gray-50"
      )}
    >
      <span
        className="truncate"
        title={todo.text}
        onClick={() => toggleComplete(todo.id)}
      >
        {todo.text}
      </span>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
      >
        <TrashIcon className="w-5 h-5 text-gray-400" />
      </button>
    </li>
  );
}
