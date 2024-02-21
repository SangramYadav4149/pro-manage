import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setDeleteTask,
  toDoCollapse,
  toDoCollapseToggle,
} from "../../../Redux/Board/BoardSlice";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import "./ToDoCard.css";
const ToDoCard = () => {
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const toggle = useSelector(toDoCollapseToggle);
  const toDoStatus = useSelector(toDoCollapse);
  const dispatch = useDispatch();
  const handleToggleShowAllTasks = () => {
    setShowAllTasks(!showAllTasks);
  };
  const handleToggleShowOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleDeleteTask = (id) => {
    dispatch(setDeleteTask({ id: id }));
  };

  useEffect(() => {
    if (toDoStatus) {
      setShowAllTasks(false);
    }
  }, [toggle]);
  return (
    <section className="todo-card-container">
      <div className="todo-card-section">
        <div className="todo-card-section-up">
          <div className="sec-left">
            <div className="priority-sec">
              <span className="color" style={{ background: "red" }}></span>
              <span className="task-priority">HIGH PRIORITY</span>
            </div>
            <div className="task-title">HERO SECTION</div>
          </div>
          <div className="sec-right">
            <SlOptions onClick={() => handleToggleShowOptions()} />
            <div className={`${showOptions ? "options-on" : "options-off"}`}>
              <span>Edit</span>
              <span>Share</span>
              <span onClick={() => handleDeleteTask("55")} className="delete">
                Delete
              </span>
            </div>
          </div>
        </div>
        <div className="todo-card-section-middle">
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
            {showAllTasks && (
              <>
                <div className="task-sec">
                  <span className="check-box-sec">
                    {" "}
                    <input className="check-box" type="checkbox" />
                  </span>
                  <span className="task">
                    adipisicing elit. Perferendis, iste!
                  </span>
                </div>
                <div className="task-sec">
                  <span className="check-box-sec">
                    {" "}
                    <input className="check-box" type="checkbox" />
                  </span>
                  <span className="task">Perferendis, iste!</span>
                </div>
                <div className="task-sec">
                  <span className="check-box-sec">
                    {" "}
                    <input className="check-box" type="checkbox" />
                  </span>
                  <span className="task">adipisic</span>
                </div>
                <div className="task-sec">
                  <span className="check-box-sec">
                    {" "}
                    <input className="check-box" type="checkbox" />
                  </span>
                  <span className="task">
                    adipisicing elit. Perferendis, iste!
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="todo-card-section-down">
          <div className="btn-left">
            <button>Feb 20th</button>
          </div>
          <div className="btn-right">
            <button>BACKLOG</button> <button>PROGRES</button>{" "}
            <button>DONE</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToDoCard;
