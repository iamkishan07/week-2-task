import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import themeReducer from "./themeSlice";
import profileReducer from "./profileSlice";

const STORAGE_KEY = "taskflow-tasks";
const THEME_STORAGE_KEY = "taskflow-theme";
const PROFILE_STORAGE_KEY = "taskflow-profile";
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
}

function loadTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark"
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}
function loadProfile() {
  try {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    const profile = saved ? JSON.parse(saved) : null;
    return { name: typeof profile?.name === "string" && profile.name.trim() ? profile.name : "Kishan" };
  } catch {
    return { name: "Kishan" };
  }
}
const persistedTasks = typeof window !== "undefined" ? loadTasks() : null;
const initialTasks = persistedTasks || [
  {
    id: "demo-1",
    title: "Build the dashboard UI",
    description: "Create the responsive layout and reusable components.",
    priority: "High",
    dueDate: "2026-10-30",
    status: "in-progress",
    createdAt: Date.now() - 300000,
  },
  {
    id: "demo-2",
    title: "Review project requirements",
    description: "Check all features and acceptance criteria.",
    priority: "Medium",
    dueDate: "2026-10-29",
    status: "todo",
    createdAt: Date.now() - 200000,
  },
  {
    id: "demo-3",
    title: "Set up Redux store",
    description: "Keep task actions and state in one place.",
    priority: "Low",
    dueDate: "2026-11-02",
    status: "todo",
    createdAt: Date.now() - 100000,
  },
  {
    id: "demo-4",
    title: "Create task card component",
    description: "Show priority, due date and quick actions.",
    priority: "High",
    dueDate: "2026-10-28",
    status: "completed",
    createdAt: Date.now() - 50000,
  },
];
export const store = configureStore({
  reducer: { tasks: tasksReducer, theme: themeReducer, profile: profileReducer },
  preloadedState: {
    tasks: { items: initialTasks },
    theme: typeof window !== "undefined" ? loadTheme() : "light",
    profile: typeof window !== "undefined" ? loadProfile() : { name: "Kishan" },
  },
});
store.subscribe(() => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(store.getState().tasks.items),
    );
    localStorage.setItem(THEME_STORAGE_KEY, store.getState().theme);
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(store.getState().profile));
  } catch {
    /* storage may be disabled */
  }
});
