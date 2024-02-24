import Backlog from "../Model/Backlog.js";
import Done from "../Model/Done.js";
import InProgress from "../Model/InProgress.js";
import Todo from "../Model/ToDo.js";
import User from "../Model/User.js";

export const getUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserAllTasks = async (req, res) => {
  try {
    const { _id } = req.user;
    const allTodo = await Todo.find({ creater: _id });
    const allbacklog = await Backlog.find({ creater: _id });
    const allInProgress = await InProgress.find({ creater: _id });
    const allDone = await Done.find({ creater: _id });
    res.status(200).json({
      backlog: allbacklog,
      todo: allTodo,
      inProgress: allInProgress,
      done: allDone,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
