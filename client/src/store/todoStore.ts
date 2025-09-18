import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  completedAt: number | null;
}

interface TodoStore {
  todos: Todo[];
  completedHistory: Todo[];
  addTodo: (text: string) => void;
  toggleTodoComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  pruneCompleted: () => void;
}

export const useTodoStore = create<TodoStore>()(
  devtools((set, get) => ({
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
        completed: true,
      },
      {
        id: 102,
        text: "walk the dog",
        completedAt: Date.now() - 1000 * 60 * 60 * 48, // 48 hours ago
        completed: true,
      },
      {
        id: 103,
        text: "read a book",
        completedAt: Date.now() - 1000 * 60 * 60 * 72, // 72 hours ago
        completed: true,
      },
    ],

    addTodo: (text: string) => {
      const newTodo: Todo = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        completedAt: null,
      };
      if (!newTodo.text) return;
      set({ todos: [...get().todos, newTodo] });
    },

    toggleTodoComplete: (id: number) => {
      set({
        todos: get().todos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                completed: !todo.completed,
                completedAt: !todo.completed ? Date.now() : null,
              }
            : todo
        ),
      });
    },

    deleteTodo: (id: number) => {
      set({ todos: get().todos.filter((todo) => todo.id !== id) });
    },

    pruneCompleted: () => {
      const now = Date.now();
      const cutoff = now - 1000 * 60 * 60 * 24; // 24 hours ago

      const toPrune = get().todos.filter(
        (todo) =>
          todo.completed && todo.completedAt && todo.completedAt <= cutoff
      );

      const remainingTodos = get().todos.filter(
        (todo) =>
          !(todo.completed && todo.completedAt && todo.completedAt <= cutoff)
      );

      const newHistory = [
        ...get().completedHistory,
        ...toPrune.map((todo) => ({
          ...todo,
        })),
      ];

      set({ todos: remainingTodos, completedHistory: newHistory });
    },
  }))
);
