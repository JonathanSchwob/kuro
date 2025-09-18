import clsx from "clsx";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Todo } from "../../store/todoStore";

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export default function TodoItem({
  todo,
  toggleComplete,
  deleteTodo,
}: TodoItemProps) {
  return (
    <li
      className={clsx(
        "p-3 border border-gray-200 rounded-2xl cursor-pointer shadow-sm flex justify-between items-center group truncate max-w-full",
        "hover:bg-blue-100",
        todo.completed ? "line-through text-gray-400 bg-gray-100" : "bg-gray-50"
      )}
      onClick={() => toggleComplete(todo.id)}
    >
      <span className="truncate" title={todo.text}>
        {todo.text}
      </span>

      <button
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer hover:scale-110"
        onClick={(e) => {
          e.stopPropagation();
          deleteTodo(todo.id);
        }}
      >
        <TrashIcon className="w-5 h-5 text-gray-400" />
      </button>
    </li>
  );
}
