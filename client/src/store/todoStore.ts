import { create } from "zustand";
import { devtools } from "zustand/middleware";
import dayjs from "dayjs";

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
  editTodo: (id: number, newText: string) => void;
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
        completedAt: dayjs().subtract(2, "hour").valueOf(),
      },
    ],
    completedHistory: [
      {
        id: 101,
        text: "buy groceries",
        completedAt: dayjs().subtract(30, "hour").valueOf(),
        completed: true,
      },
      {
        id: 102,
        text: "walk the dog",
        completedAt: dayjs().subtract(48, "hour").valueOf(),
        completed: true,
      },
      {
        id: 103,
        text: "read a book",
        completedAt: dayjs().subtract(72, "hour").valueOf(),
        completed: true,
      },
    ],

    addTodo: (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const newTodo: Todo = {
        id: Date.now(),
        text: trimmed,
        completed: false,
        completedAt: null,
      };
      set({ todos: [...get().todos, newTodo] });
    },

    editTodo: (id: number, newText: string) =>
      set(
        (state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text: newText } : todo
          ),
        }),
        false,
        "editTodo"
      ),

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
      const todayStart = dayjs().startOf("day");
      const todos = get().todos;

      const toPrune = todos.filter(
        (todo) =>
          todo.completed &&
          todo.completedAt !== null &&
          dayjs(todo.completedAt).isBefore(todayStart)
      );

      const remainingTodos = todos.filter((todo) => !toPrune.includes(todo));

      const newHistory = [...get().completedHistory, ...toPrune];

      set({ todos: remainingTodos, completedHistory: newHistory });
    },
  }))
);
