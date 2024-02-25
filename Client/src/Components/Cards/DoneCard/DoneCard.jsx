import React, { useEffect, useState } from "react";
import "./DoneCard.css";
import { SlOptions } from "react-icons/sl";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import {
  backlogCollapse,
  doneCollapseToggle,
  doneCollapsee,
  setDeleteTask,
  setEditTask,
  toggle,
} from "../../../Redux/Board/BoardSlice";
import {
  addToBacklogAsync,
  addToInProgressAsync,
  addToTodoAsync,
  reFatchAlltasksToggle,
} from "../../../Redux/User/UserSlice";

const DoneCard = ({ task }) => {
  const { title, checklist, priority, colour, dueDate } = task;
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [loader, setLoader] = useState(0);
  const Toggle = useSelector(doneCollapseToggle);
  const doneStatus = useSelector(doneCollapsee);
  const boardReFatchToggle = useSelector(reFatchAlltasksToggle);
  const dispatch = useDispatch();

  const handeEditTask = () => {
    dispatch(setEditTask({ task: task, from: "DONE" }));
  };

  const handleToggleShowAllTasks = () => {
    setShowAllTasks(!showAllTasks);
  };
  const handleToggleShowOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleDeleteTask = (id) => {
    dispatch(setDeleteTask({ id: id, from: "DONE" }));
  };
  const handleAddToBacklog = (from) => {
    setLoader(1);
    dispatch(addToBacklogAsync({ removeFrom: from, task: task }));
  };

  const handleAddToToDo = (from) => {
    setLoader(2);
    dispatch(addToTodoAsync({ removeFrom: from, task: task }));
  };
  const handleAddToInProgress = (from) => {
    setLoader(3);
    dispatch(addToInProgressAsync({ removeFrom: from, task: task }));
  };

  useEffect(() => {
    if (doneStatus) {
      setShowAllTasks(false);
    }
    if (loader) {
      setLoader(0);
    }
  }, [Toggle, boardReFatchToggle]);
  return (
    <section className="done-card-container">
      <div className="done-card-section">
        <div className="done-card-section-up">
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
                onClick={() => handleDeleteTask(task._id)}
                className="delete"
              >
                Delete
              </span>
            </div>
          </div>
        </div>
        <div className="done-card-section-middle">
          <div className="sec-up">
            <span className="checklist">Checlist(4/8)</span>
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
              checklist?.map((task, i) => {
                return (
                  <div key={i} className="task-sec">
                    <span className="check-box-sec">
                      <input className="check-box" type="checkbox" />
                    </span>
                    <span className="task">{task.text}</span>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="done-card-section-down">
          {dueDate && (
            <div className="btn-left">
              <button>{dueDate}</button>
            </div>
          )}
          <div className="btn-right">
            <button onClick={() => handleAddToBacklog("Done")}>
              {loader !== 1 ? "BACKLOG" : <BeatLoader size={4} color="black" />}
            </button>
            <button onClick={() => handleAddToToDo("Done")}>
              {loader !== 2 ? "TODO" : <BeatLoader size={4} color="black" />}
            </button>
            <button onClick={() => handleAddToInProgress("DONE")}>
              {loader !== 3 ? (
                "PROGRESS"
              ) : (
                <BeatLoader size={4} color="black" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoneCard;
