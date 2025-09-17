export default function TodoInput({ newTodo, setNewTodo, addTodo }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(newTodo);
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Add a todo..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm placeholder-gray-400 placeholder:italic"
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
