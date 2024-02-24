import Backlog from "../Model/Backlog.js";
import Done from "../Model/Done.js";
import InProgress from "../Model/InProgress.js";
import Todo from "../Model/ToDo.js";

const createTodo = async (req, res) => {
  try {
    const { _id } = req.user;
    const { title, checklist, priority, dueDate, colour, pureDate } = req.body;

    if (title && checklist && priority && _id && colour) {
      const createTodo = new Todo({
        title,
        checklist,
        priority,
        creater: _id,
        dueDate,
        pureDate,
        colour,
      });
      await createTodo.save();
      res.status(201).json(createTodo);
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
const addToBacklog = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { task, removeFrom } = req.body;

    const tasks = {
      1: "TODO",
      2: "INPROGRESS",
      3: "DONE",
    };
    if (task && removeFrom && _id && id) {
      const createBacklog = new Backlog({
        title: task.title,
        checklist: task.checklist,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate : "",
        pureDate: task.pureDate,
        colour: task.colour,
        creater: _id,
      });
      await createBacklog.save();

      if (removeFrom === tasks["1"]) {
        const deleteTask = await Todo.findByIdAndDelete(id);
      } else if (removeFrom === tasks["2"]) {
        const deleteTask = await InProgress.findByIdAndDelete(id);
      } else {
        const deleteTask = await Done.findByIdAndDelete(id);
      }
      res.status(201).json(createTodo);
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
const addToToDo = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { task, removeFrom } = req.body;

    const tasks = {
      1: "BACKLOG",
      2: "INPROGRESS",
      3: "DONE",
    };
    if (task && removeFrom && _id && id) {
      const createTodo = new Todo({
        title: task.title,
        checklist: task.checklist,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate : "",
        pureDate: task.pureDate,
        colour: task.colour,
        creater: _id,
      });
      await createTodo.save();

      if (removeFrom === tasks["1"]) {
        const deleteTask = await Backlog.findByIdAndDelete(task._id);
      } else if (removeFrom === tasks["2"]) {
        const deleteTask = await InProgress.findByIdAndDelete(task._id);
      } else {
        const deleteTask = await Done.findByIdAndDelete(task._id);
      }
      res.status(201).json(createTodo);
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
const addToInProgress = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { task, removeFrom } = req.body;
    const tasks = {
      1: "BACKLOG",
      2: "TODO",
      3: "DONE",
    };
    if (task && removeFrom && _id && id) {
      const createInProgress = new InProgress({
        title: task.title,
        checklist: task.checklist,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate : "",
        pureDate: task.pureDate,
        colour: task.colour,
        creater: _id,
      });
      await createInProgress.save();

      if (removeFrom === tasks["1"]) {
        const deleteTask = await Backlog.findByIdAndDelete(task._id);
      } else if (removeFrom === tasks["2"]) {
        const deleteTask = await Todo.findByIdAndDelete(task._id);
      } else {
        const deleteTask = await Done.findByIdAndDelete(task._id);
      }
      res.status(201).json(createInProgress);
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
const addToDone = async (req, res) => {
  try {
    const { _id } = req.user;
    const { id } = req.params;
    const { task, removeFrom } = req.body;

    const tasks = {
      1: "BACKLOG",
      2: "TODO",
      3: "INPROGRESS",
    };
    if (task && removeFrom && _id && id) {
      const createDone = new Done({
        title: task.title,
        checklist: task.checklist,
        priority: task.priority,
        dueDate: task.dueDate ? task.dueDate : "",
        pureDate: task.pureDate,
        colour: task.colour,
        creater: _id,
      });
      await createDone.save();

      if (removeFrom === tasks["1"]) {
        const deleteTask = await Backlog.findByIdAndDelete(id);
      } else if (removeFrom === tasks["2"]) {
        const deleteTask = await Todo.findByIdAndDelete(id);
      } else {
        const deleteTask = await InProgress.findByIdAndDelete(id);
      }
      res.status(201).json(createDone);
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};

const editTask = async (req, res) => {
  try {
    const tasks = {
      1: "BACKLOG",
      2: "TODO",
      3: "INPROGRESS",
      4: "DONE",
    };
    const { id } = req.params;
    const { _id } = req.user;
    const { task, from } = req.body;

    if (id && _id && task && from) {
      if (from === tasks["1"]) {
        const updateTask = await Backlog.findByIdAndUpdate(
          id,
          {
            title: task.title,
            checklist: task.checklist,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate : "",
            pureDate: task.pureDate,
            colour: task.colour,
            creater: _id,
          },
          { new: true }
        );
      } else if (from === tasks["2"]) {
        const updateTask = await Todo.findByIdAndUpdate(
          id,
          {
            title: task.title,
            checklist: task.checklist,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate : "",
            pureDate: task.pureDate,
            colour: task.colour,
            creater: _id,
          },
          { new: true }
        );
      } else if (from === tasks["3"]) {
        const updateTask = await InProgress.findByIdAndUpdate(
          id,
          {
            title: task.title,
            checklist: task.checklist,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate : "",
            pureDate: task.pureDate,
            colour: task.colour,
            creater: _id,
          },
          { new: true }
        );
      } else {
        const updateTask = await Done.findByIdAndUpdate(
          id,
          {
            title: task.title,
            checklist: task.checklist,
            priority: task.priority,
            dueDate: task.dueDate ? task.dueDate : "",
            pureDate: task.pureDate,
            colour: task.colour,
            creater: _id,
          },
          { new: true }
        );
      }

      res.status(201).json({ mesage: "Updated succesfully!" });
    } else {
      res.status(400).json({ message: "All fields are required!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(`Error : ${error.message}`);
  }
};
export {
  createTodo,
  addToBacklog,
  addToToDo,
  addToInProgress,
  addToDone,
  editTask,
};
