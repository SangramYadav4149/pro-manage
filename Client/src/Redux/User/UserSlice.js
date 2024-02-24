import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToBacklog,
  addToDone,
  addToInProgress,
  addToToDo,
  createTodo,
  deleteTask,
  editTask,
  getUser,
  getUserAllTasks,
  loginUser,
  registerUser,
} from "./UserAPI";

const initialState = {
  user: {},
  toggle: false,
  todo: [],
  backlog: [],
  inProgress: [],
  done: [],
  reFatchAlltasksToggle: false,
};

export const registerUserAsync = createAsyncThunk(
  "user/register",
  async (data) => {
    try {
      const response = await registerUser(data);
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);
export const createTodoAsync = createAsyncThunk(
  "board/createTodo",
  async (data) => {
    try {
      const response = await createTodo(data);
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);

export const getUserAsync = createAsyncThunk("user/getUser", async () => {
  try {
    const response = await getUser();
    return response.data;
  } catch (error) {
    return Error(error);
  }
});

export const loginUserAsync = createAsyncThunk("user/login", async (data) => {
  try {
    const response = await loginUser(data);
    return response.data;
  } catch (error) {
    return Error(error);
  }
});

export const addToBacklogAsync = createAsyncThunk(
  "user/addToBacklog",
  async (data) => {
    try {
      const response = await addToBacklog(data);
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);

export const getUserAllTasksAsync = createAsyncThunk(
  "user/allTasks",
  async () => {
    try {
      const response = await getUserAllTasks();
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);
export const addToTodoAsync = createAsyncThunk(
  "user/addToTodo",
  async (data) => {
    try {
      const response = await addToToDo(data);
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);
export const addToDoneAsync = createAsyncThunk(
  "user/addToDone",
  async (data) => {
    try {
      const response = await addToDone(data);
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);
export const addToInProgressAsync = createAsyncThunk(
  "user/addToInProgress",
  async (data) => {
    try {
      const response = await addToInProgress(data);
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);
export const editTaskAsync = createAsyncThunk(
  "user/updateTask",
  async (data) => {
    try {
      const response = await editTask(data);
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);
export const deleteTaskAsync = createAsyncThunk(
  "user/deleteTask",
  async (data) => {
    try {
      const response = await deleteTask(data);
      return response.data;
    } catch (error) {
      return Error(error);
    }
  }
);
const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUserAsync.pending, (state, action) => {})
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        const { token, user } = action.payload;

        localStorage.setItem("TOKEN", token);
        state.user = user;
        state.toggle = state.toggle ? false : true;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {})
      .addCase(loginUserAsync.pending, (state, action) => {})
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        const { token, user } = action.payload;

        localStorage.setItem("TOKEN", token);
        state.user = user;
        state.toggle = state.toggle ? false : true;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {})
      .addCase(getUserAsync.pending, (state, action) => {})
      .addCase(getUserAsync.fulfilled, (state, action) => {
        const { user } = action.payload;

        state.user = user;
        state.toggle = state.toggle ? false : true;
      })
      .addCase(getUserAsync.rejected, (state, action) => {})
      .addCase(createTodoAsync.pending, (state, action) => {})
      .addCase(createTodoAsync.fulfilled, (state, action) => {
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? false
          : true;
      })
      .addCase(createTodoAsync.rejected, (state, action) => {})
      .addCase(getUserAllTasksAsync.pending, (state, action) => {})
      .addCase(getUserAllTasksAsync.fulfilled, (state, action) => {
        const { backlog, todo, inProgress, done } = action.payload;
        state.backlog = backlog;
        state.todo = todo;
        state.inProgress = inProgress;
        state.done = done;
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? true
          : false;
      })
      .addCase(getUserAllTasksAsync.rejected, (state, action) => {})
      .addCase(addToBacklogAsync.pending, (state, action) => {})
      .addCase(addToBacklogAsync.fulfilled, (state, action) => {
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? false
          : true;
      })
      .addCase(addToBacklogAsync.rejected, (state, action) => {})
      .addCase(addToTodoAsync.pending, (state, action) => {})
      .addCase(addToTodoAsync.fulfilled, (state, action) => {
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? false
          : true;
      })
      .addCase(addToTodoAsync.rejected, (state, action) => {})
      .addCase(addToDoneAsync.pending, (state, action) => {})
      .addCase(addToDoneAsync.fulfilled, (state, action) => {
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? false
          : true;
      })
      .addCase(addToDoneAsync.rejected, (state, action) => {})
      .addCase(addToInProgressAsync.pending, (state, action) => {})
      .addCase(addToInProgressAsync.fulfilled, (state, action) => {
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? false
          : true;
      })
      .addCase(addToInProgressAsync.rejected, (state, action) => {})
      .addCase(editTaskAsync.pending, (state, action) => {})
      .addCase(editTaskAsync.fulfilled, (state, action) => {
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? false
          : true;
      })
      .addCase(editTaskAsync.rejected, (state, action) => {})
      .addCase(deleteTaskAsync.pending, (state, action) => {})
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.reFatchAlltasksToggle = state.reFatchAlltasksToggle
          ? false
          : true;
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {});
  },
});

export const {} = UserSlice.actions;
export const user = (state) => state.user.user;
export const toggle = (state) => state.user.toggle;
export const backlog = (state) => state.user.backlog;
export const todo = (state) => state.user.todo;
export const inProgress = (state) => state.user.inProgress;
export const done = (state) => state.user.done;
export const reFatchAlltasksToggle = (state) =>
  state.user.reFatchAlltasksToggle;
export default UserSlice.reducer;
