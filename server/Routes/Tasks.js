import express from "express";
import {
  addToBacklog,
  addToDone,
  addToInProgress,
  addToToDo,
  createTodo,
  editTask,
} from "../Controller/Tasks.js";
import { varifyToken } from "../MiddleWare/Authentication.js";

const router = express.Router();

router
  .post("/createTodo", varifyToken, createTodo)
  .post("/add/backlog/:id", varifyToken, addToBacklog)
  .post("/add/todo/:id", varifyToken, addToToDo)
  .post("/add/inprogress/:id", varifyToken, addToInProgress)
  .post("/add/done/:id", varifyToken, addToDone)
  .post("/edit/task/:id", varifyToken, editTask);

export default router;
