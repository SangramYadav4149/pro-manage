import axios from "axios";
import { getAxiosConfigToken } from "../../Utils/AxiosConfigToken";

export const registerUser = async (data) => {
  try {
    console.log(data);
    return await axios.post(
      "https://backend-r1sv.onrender.com/promaneger/api/user/register",
      data
    );
  } catch (error) {
    console.log(error.message);
  }
};
export const loginUser = async (data) => {
  return await axios.post(
    "http://localhost:5000/promaneger/api/user/login",
    data
  );
};
export const getUser = async () => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));

    return await axios.get(
      "https://backend-r1sv.onrender.com/promaneger/api/get/user",

      config
    );
  } catch (error) {
    console.log(error.message);
  }
};
export const createTodo = async (data) => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.post(
      "https://backend-r1sv.onrender.com/promaneger/api/tasks/createTodo",
      data,
      config
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserAllTasks = async () => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.get(
      "https://backend-r1sv.onrender.com/promaneger/api/get/user/alltasks",

      config
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const addToBacklog = async (data) => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.post(
      `https://backend-r1sv.onrender.com/promaneger/api/tasks/add/backlog/${data.task._id}`,
      data,
      config
    );
  } catch (error) {
    console.log(error.message);
  }
};
export const addToToDo = async (data) => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.post(
      `https://backend-r1sv.onrender.com/promaneger/api/tasks/add/todo/${data.task._id}`,
      data,
      config
    );
  } catch (error) {
    console.log(error.message);
  }
};
export const addToInProgress = async (data) => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.post(
      `https://backend-r1sv.onrender.com/promaneger/api/tasks/add/inprogress/${data.task._id}`,
      data,
      config
    );
  } catch (error) {
    console.log(error.message);
  }
};
export const addToDone = async (data) => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.post(
      `https://backend-r1sv.onrender.com/promaneger/api/tasks/add/done/${data.task._id}`,
      data,
      config
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const editTask = async (data) => {
  try {
    const { task } = data;
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.post(
      `https://backend-r1sv.onrender.com/promaneger/api/tasks/edit/task/${task._id}`,
      data,
      config
    );
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteTask = async (data) => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.post(
      `https://backend-r1sv.onrender.com/promaneger/api/tasks/delete/task/${data.id}`,
      data,
      config
    );
  } catch (error) {
    console.log(error.message);
  }
};
export const getUserAllCreatedTasksInfo = async () => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.get(
      `https://backend-r1sv.onrender.com/promaneger/api/tasks/get/user/alltasksinfo/`,

      config
    );
  } catch (error) {
    console.log(error.message);
  }
};
export const changeUserPassword = async (data) => {
  try {
    const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
    return await axios.post(
      `http://localhost:5000/promaneger/api/get/user/change/password`,
      data,
      config
    );
  } catch (error) {
    console.log(error.message);
  }
};

////promaneger/api/get
