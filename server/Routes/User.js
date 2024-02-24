import express from "express";

import { varifyToken } from "../MiddleWare/Authentication.js";
import { getUser, getUserAllTasks } from "../Controller/User.js";

const router = express.Router();

router
  .get("/user", varifyToken, getUser)
  .get("/user/alltasks", varifyToken, getUserAllTasks);

export default router;
