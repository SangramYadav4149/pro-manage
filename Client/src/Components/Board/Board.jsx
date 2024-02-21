import React, { useState } from "react";
import "./Board.css";
import { getCurrentDate } from "../../Utils/Date";
import { VscCollapseAll } from "react-icons/vsc";
import { IoIosAdd } from "react-icons/io";
import { useDispatch } from "react-redux";
import {
  setBackLogCollapse,
  setDoneCollapse,
  setInProgressCollapse,
  setToDoCollapse,
  toggleCreateTask,
} from "../../Redux/Board/BoardSlice";

import BacklogCardPage from "../../Pages/CardsPage/BacklogCardPage/BacklogCardPage";
import ToDoCardPage from "../../Pages/CardsPage/ToDoCardPage/ToDoPage";
import DoneCardpage from "../../Pages/CardsPage/DoneCardPage/DoneCardpage";
import InProgressCardPage from "../../Pages/CardsPage/InProgressCardPage/InProgressCardPage";
const Board = () => {
  const taskBoxes = {
    1: "backlogs",
    2: "todo",
    3: "inprogress",
    4: "done",
  };

  const dispatch = useDispatch();
  const date = getCurrentDate();
  const handleToggleCreateTaskSec = () => {
    dispatch(toggleCreateTask());
  };
  const handleCollapseAll = (taskBoxNumber, value) => {
    if (taskBoxNumber === taskBoxes["1"]) {
      dispatch(setBackLogCollapse({ status: value }));
    } else if (taskBoxNumber === taskBoxes["2"]) {
      dispatch(setToDoCollapse({ status: value }));
    } else if (taskBoxNumber === taskBoxes["3"]) {
      dispatch(setInProgressCollapse({ status: value }));
    } else {
      dispatch(setDoneCollapse({ status: value }));
    }
  };

  return (
    <section className="board-container">
      <div className="borad-sec-1">
        <span className="board-welcome">Welcome! Kumar</span>
        <span className="board-date">{date}</span>
      </div>
      <div className="board-sec-2">
        <span className="section-title">Board</span>
        <span className="board-filters">
          <select className="options">
            <option value="">Today</option>
            <option value="">This week</option>
            <option value="">This month</option>
          </select>
        </span>
      </div>
      <div className="board-sec-3">
        <div className="board-box">
          <div className="board-box-up-sec">
            <div className="box">
              <span className="text">Backlogs</span>
              <span onClick={() => handleCollapseAll(taskBoxes["1"], true)}>
                <VscCollapseAll size={21} />
              </span>
            </div>
          </div>
          <div className="tasks-sec">
            {[1, 2, 3, 4, 5, 6].map(() => {
              return (
                <div className="task-box">
                  <BacklogCardPage />
                </div>
              );
            })}
          </div>
        </div>
        <div className="board-box">
          <div className="board-box-up-sec">
            <div className="box">
              <span className="text">To do</span>
              <span className="add-icon">
                <IoIosAdd
                  onClick={() => handleToggleCreateTaskSec()}
                  size={25}
                />
                <span onClick={() => handleCollapseAll(taskBoxes["2"], true)}>
                  <VscCollapseAll size={21} />
                </span>
              </span>
            </div>
          </div>
          <div className="tasks-sec">
            {[1, 2, 3, 4, 5, 6].map(() => {
              return (
                <div className="task-box">
                  <ToDoCardPage />
                </div>
              );
            })}
          </div>
        </div>
        <div className="board-box">
          <div className="board-box-up-sec">
            <div className="box">
              <span className="text">In pogress</span>
              <span onClick={() => handleCollapseAll(taskBoxes["3"], true)}>
                <VscCollapseAll size={21} />
              </span>
            </div>
          </div>
          <div className="tasks-sec">
            {[1, 2, 3, 4, 5, 6].map(() => {
              return (
                <div className="task-box">
                  <InProgressCardPage />
                </div>
              );
            })}
          </div>
        </div>
        <div className="board-box">
          <div className="board-box-up-sec">
            <div className="box">
              <span className="text">Done</span>
              <span onClick={() => handleCollapseAll(taskBoxes["4"], true)}>
                <VscCollapseAll size={21} />
              </span>
            </div>
          </div>
          <div className="tasks-sec">
            {[1, 2, 3, 4, 5, 6].map(() => {
              return (
                <div className="task-box">
                  <DoneCardpage />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Board;
