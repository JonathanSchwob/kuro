import clsx from "clsx";

export default function TodoItem({ todo, toggleComplete }) {
  return (
    <li
      onClick={() => toggleComplete(todo.id)}
      className={clsx(
        "p-2 border border-gray-200 rounded-xl cursor-pointer hover:bg-blue-100",
        todo.completed ? "line-through text-gray-400 bg-gray-100" : "bg-white"
      )}
    >
      {todo.text}
    </li>
  );
}
