import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  age: number;
  des: string;
}

const initialState: User[] = [];

const userSlicer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      return action.payload; // Ghi đè toàn bộ danh sách
    },
    create: (state, action: PayloadAction<User>) => {
      state.push(action.payload); // Thêm 1 user mới
    },
  },
});

export const { create, setUsers } = userSlicer.actions;
export default userSlicer.reducer;
