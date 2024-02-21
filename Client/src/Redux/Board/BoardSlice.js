import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createTask: false,
  toggle: false,
  backlogCollapseToggle: false,
  toDoCollapseToggle: false,
  inProgressCollapseToggle: false,
  doneCollapseToggle: false,
  deleteTask: "",
  backlogCollapse: false,
  toDoCollapse: false,
  inProgressCollapse: false,
  doneCollapse: false,
};

const BoardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    toggleCreateTask: (state) => {
      state.createTask = state.createTask ? false : true;
      state.toggle = state.toggle ? false : true;
    },
    setDeleteTask: (state, action) => {
      const { id } = action.payload;
      state.deleteTask = id;
      state.toggle = state.toggle ? false : true;
    },
    clearDeleteTask: (state) => {
      state.deleteTask = "";
      state.toggle = state.toggle ? false : true;
    },
    setBackLogCollapse: (state, action) => {
      const { status } = action.payload;
      state.backlogCollapse = status;
      state.backlogCollapseToggle = state.backlogCollapseToggle ? false : true;
    },
    setToDoCollapse: (state, action) => {
      const { status } = action.payload;
      state.toDoCollapse = status;
      state.toDoCollapseToggle = state.toDoCollapseToggle ? false : true;
    },
    setInProgressCollapse: (state, action) => {
      const { status } = action.payload;
      state.inProgressCollapse = status;
      state.inProgressCollapseToggle = state.inProgressCollapseToggle
        ? false
        : true;
    },
    setDoneCollapse: (state, action) => {
      const { status } = action.payload;
      state.doneCollapse = status;
      state.doneCollapseToggle = state.doneCollapseToggle ? false : true;
    },
  },
});

export const {
  toggleCreateTask,
  setDeleteTask,
  clearDeleteTask,
  setBackLogCollapse,
  setToDoCollapse,
  setInProgressCollapse,
  setDoneCollapse,
} = BoardSlice.actions;
export const createTask = (state) => state.board.createTask;
export const toggle = (state) => state.board.toggle;
export const toDoCollapseToggle = (state) => state.board.toDoCollapseToggle;
export const backlogCollapseToggle = (state) =>
  state.board.backlogCollapseToggle;
export const inProgressCollapseToggle = (state) =>
  state.board.inProgressCollapseToggle;
export const doneCollapseToggle = (state) => state.board.doneCollapseToggle;
export const deleteTask = (state) => state.board.deleteTask;
export const backlogCollapse = (state) => state.board.backlogCollapse;
export const toDoCollapse = (state) => state.board.toDoCollapse;
export const inProgressCollapse = (state) => state.board.inProgressCollapse;
export const doneCollapsee = (state) => state.board.doneCollapse;
export default BoardSlice.reducer;
