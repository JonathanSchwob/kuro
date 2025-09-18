import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useTodoStore = create(
  devtools((set) => ({
    todos: [
      { id: 0, text: "learn react", completed: false, completedAt: null },
      {
        id: 200,
        text: "old completed todo",
        completed: true,
        completedAt: Date.now() - 1000 * 60 * 60 * 30, // 30 hours ago
      },
    ],
    completedHistory: [
      {
        id: 101,
        text: "buy groceries",
        completedAt: Date.now() - 1000 * 60 * 60 * 30, // 30 hours ago
      },
      {
        id: 102,
        text: "walk the dog",
        completedAt: Date.now() - 1000 * 60 * 60 * 48, // 48 hours ago
      },
      {
        id: 103,
        text: "read a book",
        completedAt: Date.now() - 1000 * 60 * 60 * 72, // 72 hours ago
      },
    ],

    // Add a new todo
    addTodo: (text) =>
      set(
        (state) => {
          const newTodo = {
            id: Date.now(),
            text: text.trim(),
            completed: false,
            completedAt: null,
          };
          const newState = { todos: [...state.todos, newTodo] };
          console.log("[addTodo] newState:", { ...state, ...newState });
          return newState;
        },
        false,
        "addTodo"
      ),

    // Toggle completion status
    toggleTodoComplete: (id) =>
      set(
        (state) => {
          const newTodos = state.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  completed: !todo.completed,
                  completedAt: !todo.completed ? Date.now() : null,
                }
              : todo
          );
          console.log("[toggleTodoComplete] newTodos:", newTodos);
          return { todos: newTodos };
        },
        false,
        "toggleTodoComplete"
      ),

    // Delete a todo permanently
    deleteTodo: (id) =>
      set(
        (state) => {
          const newTodos = state.todos.filter((todo) => todo.id !== id);
          console.log("[deleteTodo] newTodos:", newTodos);
          return { todos: newTodos };
        },
        false,
        "deleteTodo"
      ),

    // Prune all completed todos older than 24 hours
    pruneCompleted: () =>
      set(
        (state) => {
          const now = Date.now();
          const cutoff = now - 1000 * 60 * 60 * 24; // 24 hours ago

          const toPrune = state.todos.filter(
            (todo) =>
              todo.completed && todo.completedAt && todo.completedAt <= cutoff
          );

          const remainingTodos = state.todos.filter(
            (todo) =>
              !(
                todo.completed &&
                todo.completedAt &&
                todo.completedAt <= cutoff
              )
          );

          const newHistory = [
            ...state.completedHistory,
            ...toPrune.map((todo) => ({
              id: todo.id,
              text: todo.text,
              completedAt: todo.completedAt,
            })),
          ];

          const newState = {
            todos: remainingTodos,
            completedHistory: newHistory,
          };
          console.log("[pruneCompleted] newState:", newState);
          return newState;
        },
        false,
        "pruneCompleted"
      ),
  }))
);
