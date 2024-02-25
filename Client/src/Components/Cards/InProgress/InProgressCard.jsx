import React, { useEffect, useState } from "react";
import "./InProgressCard.css";
import { SlOptions } from "react-icons/sl";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import {
  backlogCollapse,
  inProgressCollapse,
  inProgressCollapseToggle,
  setDeleteTask,
  setEditTask,
  setInProgressCollapse,
  toggle,
} from "../../../Redux/Board/BoardSlice";
import {
  addToBacklogAsync,
  addToDoneAsync,
  addToTodoAsync,
  reFatchAlltasksToggle,
} from "../../../Redux/User/UserSlice";

const InProgressCard = ({ task }) => {
  const { title, checklist, priority, colour, dueDate } = task;
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [loader, setLoader] = useState(0);
  const boardReFatchToggle = useSelector(reFatchAlltasksToggle);
  const Toggle = useSelector(inProgressCollapseToggle);
  const inProgressStatus = useSelector(setInProgressCollapse);
  const dispatch = useDispatch();

  const handeEditTask = () => {
    dispatch(setEditTask({ task: task, from: "INPROGRESS" }));
  };

  const handleDeleteTask = (id) => {
    dispatch(setDeleteTask({ id: id, from: "INPROGRESS" }));
  };

  const handleToggleShowAllTasks = () => {
    setShowAllTasks(!showAllTasks);
  };
  const handleToggleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleAddToDone = (from) => {
    dispatch(addToDoneAsync({ removeFrom: from, task: task }));
    setLoader(3);
  };
  const handleAddToBacklog = (from) => {
    setLoader(1);
    dispatch(addToBacklogAsync({ removeFrom: from, task: task }));
  };
  const handleAddToToDo = (from) => {
    setLoader(2);
    dispatch(addToTodoAsync({ removeFrom: from, task: task }));
  };

  useEffect(() => {
    if (inProgressStatus) {
      setShowAllTasks(false);
    }
  }, [Toggle, boardReFatchToggle]);
  return (
    <section className="inprogress-container">
      <div className="inprogress-section">
        <div className="inprogress-section-up">
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
        <div className="inprogress-section-middle">
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
              checklist.map((task, i) => {
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

        <div className="inprogress-section-down">
          {dueDate && (
            <div className="btn-left">
              <button>{dueDate}</button>
            </div>
          )}
          <div className="btn-right">
            <button onClick={() => handleAddToBacklog("INPROGRESS")}>
              {loader !== 1 ? "BACKLOG" : <BeatLoader size={4} color="black" />}
            </button>
            <button onClick={() => handleAddToToDo("INPROGRESS")}>
              {loader !== 2 ? "TODO" : <BeatLoader size={4} color="black" />}
            </button>
            <button onClick={() => handleAddToDone("INPROGRESS")}>
              {loader !== 3 ? "DONE" : <BeatLoader size={4} color="black" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InProgressCard;
