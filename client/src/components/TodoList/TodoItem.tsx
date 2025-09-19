import clsx from "clsx";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Todo, useTodoStore } from "../../store/todoStore";
import EditableText from "./EditableText";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodoComplete, deleteTodo, editTodo } = useTodoStore();

  return (
    <li
      className={clsx(
        "p-3 border border-gray-200 rounded-2xl cursor-pointer shadow-sm flex justify-between items-center group truncate max-w-full",
        "hover:bg-blue-100",
        todo.completed ? "line-through text-gray-400 bg-gray-100" : "bg-gray-50"
      )}
      onClick={() => toggleTodoComplete(todo.id)}
    >
      <EditableText
        text={todo.text}
        onSave={(newText) => editTodo(todo.id, newText)}
      />

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
