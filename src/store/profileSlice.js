import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: { name: "Kishan" },
  reducers: {
    updateName(state, action) {
      state.name = action.payload.trim() || state.name;
    },
  },
});

export const { updateName } = profileSlice.actions;
export default profileSlice.reducer;