import { create } from "zustand";

export const useTodoStore = create((set) => ({
  todos: [{ id: 0, text: "learn react", completed: false, completedAt: null }],
  completedHistory: [],

  // Add a new todo
  addTodo: (text) =>
    set((state) => ({
      todos: [
        ...state.todos,
        { id: Date.now(), text, completed: false, completedAt: null },
      ],
    })),

  // Toggle completion status
  toggleTodoComplete: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? Date.now() : null, // only set when completing
            }
          : todo
      ),
    })),

  // Delete a todo permanently
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  // Prune all todos completed today at midnight
  pruneCompleted: () =>
    set((state) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const completedToday = state.todos.filter(
        (todo) =>
          todo.completed &&
          todo.completedAt &&
          new Date(todo.completedAt) >= today
      );

      const remainingTodos = state.todos.filter(
        (todo) =>
          !(
            todo.completed &&
            todo.completedAt &&
            new Date(todo.completedAt) >= today
          )
      );

      return {
        todos: remainingTodos,
        completedHistory: [
          ...state.completedHistory,
          ...completedToday.map((todo) => ({
            id: todo.id,
            text: todo.text,
            completedAt: todo.completedAt,
          })),
        ],
      };
    }),
}));
