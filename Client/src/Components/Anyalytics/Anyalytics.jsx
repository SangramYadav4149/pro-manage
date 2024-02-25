import React from "react";
import "./Anyalytics.css";
import { useSelector } from "react-redux";
import {
  allBacklog,
  allDone,
  allDueDateTasks,
  allHighPriority,
  allInProgress,
  allLowPriority,
  allModeratePriority,
  allTodo,
} from "../../Redux/User/UserSlice";

const Anyalytics = () => {
  const userAllBacklog = useSelector(allBacklog);
  const userAllTodo = useSelector(allTodo);
  const userAllInProgress = useSelector(allInProgress);
  const userAllDone = useSelector(allDone);
  const userAllHighPriorityTasks = useSelector(allHighPriority);
  const userAllModeratePriorityTasks = useSelector(allModeratePriority);
  const userAllLowPriorityTasks = useSelector(allLowPriority);
  const userAllDueDateTasks = useSelector(allDueDateTasks);
  return (
    <section className="anyalytics-container">
      <span className="section-title">Anyalytics</span>
      <div className="anyalytics-section">
        <div className="anyalytics-box">
          <div className="detail-sec">
            <div className="detail-box">
              <span className="dot"></span>
              <span className="task-title">Backlog Tasks</span>
            </div>
            <div className="anyalytics-info">
              {userAllBacklog >= 10
                ? userAllBacklog
                : userAllBacklog === 0
                ? 0
                : `0${userAllBacklog}`}
            </div>
          </div>
          <div className="detail-sec">
            <div className="detail-box">
              <span className="dot"></span>
              <span className="task-title">To-do Tasks</span>
            </div>
            <div className="anyalytics-info">
              {userAllTodo >= 10
                ? userAllTodo
                : userAllTodo === 0
                ? 0
                : `0${userAllTodo}`}
            </div>
          </div>
          <div className="detail-sec">
            <div className="detail-box">
              <span className="dot"></span>
              <span className="task-title">In-progress Tasks</span>
            </div>
            <div className="anyalytics-info">
              {" "}
              {userAllInProgress >= 10
                ? userAllInProgress
                : userAllInProgress === 0
                ? 0
                : `0${userAllInProgress}`}
            </div>
          </div>
          <div className="detail-sec">
            <div className="detail-box">
              <span className="dot"></span>
              <span className="task-title">Completed Tasks</span>
            </div>
            <div className="anyalytics-info">
              {userAllDone >= 10
                ? userAllDone
                : userAllDone === 0
                ? 0
                : `0${userAllDone}`}
            </div>
          </div>
        </div>
        <div className="anyalytics-box">
          <div className="detail-sec">
            <div className="detail-box">
              <span className="dot"></span>
              <span className="task-title">Low Priority</span>
            </div>
            <div className="anyalytics-info">
              {userAllLowPriorityTasks >= 10
                ? userAllLowPriorityTasks
                : userAllLowPriorityTasks === 0
                ? 0
                : `0${userAllLowPriorityTasks}`}
            </div>
          </div>
          <div className="detail-sec">
            <div className="detail-box">
              <span className="dot"></span>
              <span className="task-title">Moderate Priority</span>
            </div>
            <div className="anyalytics-info">
              {userAllModeratePriorityTasks >= 10
                ? userAllModeratePriorityTasks
                : userAllModeratePriorityTasks === 0
                ? 0
                : `0${userAllModeratePriorityTasks}`}
            </div>
          </div>
          <div className="detail-sec">
            <div className="detail-box">
              <span className="dot"></span>
              <span className="task-title">High Priority</span>
            </div>
            <div className="anyalytics-info">
              {userAllHighPriorityTasks >= 10
                ? userAllHighPriorityTasks
                : userAllHighPriorityTasks === 0
                ? 0
                : `0${userAllHighPriorityTasks}`}
            </div>
          </div>
          <div className="detail-sec">
            <div className="detail-box">
              <span className="dot"></span>
              <span className="task-title">Due-date Tasks</span>
            </div>
            <div className="anyalytics-info">
              {" "}
              {userAllDueDateTasks >= 10
                ? userAllDueDateTasks
                : userAllDueDateTasks === 0
                ? 0
                : `0${userAllDueDateTasks}`}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Anyalytics;
