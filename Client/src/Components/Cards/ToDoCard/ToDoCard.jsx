import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDeleteTask,
  setEditTask,
  toDoCollapse,
  toDoCollapseToggle,
} from "../../../Redux/Board/BoardSlice";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import { BeatLoader } from "react-spinners";

import "./ToDoCard.css";
import {
  addToBacklogAsync,
  addToDoneAsync,
  addToInProgressAsync,
  reFatchAlltasksToggle,
} from "../../../Redux/User/UserSlice";
const ToDoCard = ({ task }) => {
  const { title, checklist, priority, colour, dueDate } = task;

  const [showAllTasks, setShowAllTasks] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  let [checkListCheckCount, setCheckListCheckCount] = useState(0);
  const [loader, setloader] = useState(0);
  const toggle = useSelector(toDoCollapseToggle);
  const boardReFatchToggle = useSelector(reFatchAlltasksToggle);
  const toDoStatus = useSelector(toDoCollapse);
  const dispatch = useDispatch();

  const handeEditTask = () => {
    dispatch(setEditTask({ task: task, from: "TODO" }));
  };

  const handleToggleShowAllTasks = () => {
    setShowAllTasks(!showAllTasks);
  };
  const handleToggleShowOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleDeleteTask = (id) => {
    dispatch(setDeleteTask({ id: id, from: "TODO" }));
  };
  const handleAddToBacklog = (from) => {
    setloader(1);
    dispatch(addToBacklogAsync({ removeFrom: from, task: task }));
  };
  const handleAddToInProgress = (from) => {
    setloader(2);
    dispatch(addToInProgressAsync({ removeFrom: from, task: task }));
  };
  const handleAddToDone = (from) => {
    setloader(3);
    dispatch(addToDoneAsync({ removeFrom: from, task: task }));
  };

  useEffect(() => {
    if (toDoStatus) {
      setShowAllTasks(false);
    }
    if (loader) {
      setloader(0);
    }
  }, [toggle, boardReFatchToggle]);
  return (
    <section className="todo-card-container">
      <div className="todo-card-section">
        <div className="todo-card-section-up">
          <div className="sec-left">
            <div className="priority-sec">
              <span
                className="color"
                style={{ background: `${colour}` }}
              ></span>
              <span className="task-priority">{priority}</span>
            </div>
            <div className="task-title">{title}</div>
          </div>
          <div className="sec-right">
            <SlOptions onClick={() => handleToggleShowOptions()} />
            <div className={`${showOptions ? "options-on" : "options-off"}`}>
              <span onClick={() => handeEditTask()}>Edit</span>
              <span>Share</span>
              <span
                onClick={() => handleDeleteTask(task?._id)}
                className="delete"
              >
                Delete
              </span>
            </div>
          </div>
        </div>
        <div className="todo-card-section-middle">
          <div className="sec-up">
            <span className="checklist">
              Checlist( {checkListCheckCount}/{checklist.length})
            </span>
            <span onClick={() => handleToggleShowAllTasks()} className="expand">
              {!showAllTasks ? (
                <MdExpandLess color=" #767575" />
              ) : (
                <MdExpandMore color=" #767575" />
              )}
            </span>
          </div>
          <div className="sec-down">
            {showAllTasks &&
              checklist.map((note, i) => {
                /* if (note.tick) {
                  setCheckListCheckCount(checkListCheckCount + 1);
                } */

                return (
                  <div key={i} className="task-sec">
                    <span className="check-box-sec">
                      {" "}
                      <input
                        className="check-box"
                        //onChange={(e) => handleSetTick(e)}
                        type="checkbox"
                      />
                    </span>
                    <span className="task">{note.text}</span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="todo-card-section-down">
          {dueDate && (
            <div className="btn-left">
              <button>{dueDate}</button>
            </div>
          )}
          <div className="btn-right">
            <button onClick={() => handleAddToBacklog("TODO")}>
              {loader !== 1 ? "BACKLOG" : <BeatLoader size={4} color="black" />}
            </button>
            <button onClick={() => handleAddToInProgress("TODO")}>
              {loader !== 2 ? (
                "PROGRESS"
              ) : (
                <BeatLoader size={4} color="black" />
              )}
            </button>
            <button onClick={() => handleAddToDone("TODO")}>
              {loader !== 3 ? "DONE" : <BeatLoader size={4} color="black" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToDoCard;
