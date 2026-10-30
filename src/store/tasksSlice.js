import { createSlice, nanoid } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { items: [] },
  reducers: {
    addTask: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(task) {
        return { payload: { ...task, id: nanoid(), createdAt: Date.now() } };
      },
    },
    updateTask(state, action) {
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (index !== -1)
        state.items[index] = { ...state.items[index], ...action.payload };
    },
    deleteTask(state, action) {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
    moveTask(state, action) {
      const task = state.items.find((item) => item.id === action.payload.id);
      if (task) task.status = action.payload.status;
    },
  },
});

export const { addTask, updateTask, deleteTask, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
