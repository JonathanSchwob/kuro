import { useState, FormEvent, ChangeEvent } from "react";

interface TodoInputProps {
  addTodo: (text: string) => void;
}

export default function TodoInput({ addTodo }: TodoInputProps) {
  const [newTodo, setNewTodo] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = newTodo.trim();
    if (!trimmed) return;
    addTodo(trimmed);
    setNewTodo("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={newTodo}
        onChange={handleChange}
        className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm placeholder-gray-400 placeholder:italic"
        placeholder="Add a todo..."
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add
      </button>
    </form>
  );
}
