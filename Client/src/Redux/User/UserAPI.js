import axios from "axios";
import { getAxiosConfigToken } from "../../Utils/AxiosConfigToken";

export const registerUser = async (data) => {
  return await axios.post(
    "http://localhost:5000/promaneger/api/user/register",
    data
  );
};
export const loginUser = async (data) => {
  return await axios.post(
    "http://localhost:5000/promaneger/api/user/login",
    data
  );
};
export const getUser = async () => {
  const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));

  return await axios.get(
    "http://localhost:5000/promaneger/api/get/user",

    config
  );
};
export const createTodo = async (data) => {
  const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
  return await axios.post(
    "http://localhost:5000/promaneger/api/tasks/createTodo",
    data,
    config
  );
};

export const getUserAllTasks = async () => {
  const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
  return await axios.get(
    "http://localhost:5000/promaneger/api/get/user/alltasks",

    config
  );
};

export const addToBacklog = async (data) => {
  console.log(data);
  const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
  return await axios.post(
    `http://localhost:5000/promaneger/api/tasks/add/backlog/${data.task._id}`,
    data,
    config
  );
};
export const addToToDo = async (data) => {
  const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
  return await axios.post(
    `http://localhost:5000/promaneger/api/tasks/add/todo/${data.task._id}`,
    data,
    config
  );
};
export const addToInProgress = async (data) => {
  const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
  return await axios.post(
    `http://localhost:5000/promaneger/api/tasks/add/inprogress/${data.task._id}`,
    data,
    config
  );
};
export const addToDone = async (data) => {
  console.log(data);
  const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
  return await axios.post(
    `http://localhost:5000/promaneger/api/tasks/add/done/${data.task._id}`,
    data,
    config
  );
};

export const editTask = async (data) => {
  const { task } = data;
  const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
  return await axios.post(
    `http://localhost:5000/promaneger/api/tasks/edit/task/${task._id}`,
    data,
    config
  );
};
export const deleteTask = async (data) => {
  /*  const config = getAxiosConfigToken(localStorage.getItem("TOKEN"));
  return await axios.post(
    `http://localhost:5000/promaneger/api/tasks/delete/task/${data.id}`,
    data,
    config
  ); */
};
