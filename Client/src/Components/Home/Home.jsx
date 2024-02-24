import React, { useEffect, useState } from "react";
import { SiCountingworkspro } from "react-icons/si";
import { PiLayoutThin } from "react-icons/pi";
import { GoDatabase } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import "./Home.css";
import BoardPage from "../../Pages/BoardPage/BoardPage";
import AnyalyticsPage from "../../Pages/AnyalyticsPage/AnyalyticsPage";
import SettingsPage from "../../Pages/SettingsPage/SettingsPage";
import TaskCreate from "../TaskCreate/TaskCreate";
import { useSelector, useDispatch } from "react-redux";
import {
  createTask,
  deleteTask,
  editTask,
  toggle,
  toggleCreateTask,
} from "../../Redux/Board/BoardSlice";
import DeletePopUp from "../DeletePopUp/DeletePopUp";
import EditTask from "../EditTask/EditTask";
const Home = () => {
  const [selectSection, setSelectSection] = useState("board");
  const [showCreateTask, setShowCreateTask] = useState(false);
  const taskStatus = useSelector(createTask);
  const userDeleteTask = useSelector(deleteTask);
  const userEditTask = useSelector(editTask);
  const dispatch = useDispatch();
  const boardToggle = useSelector(toggle);
  const handleClickSection = (section) => {
    setSelectSection(section);
  };
  useEffect(() => {
    setShowCreateTask(taskStatus);
  }, [boardToggle]);

  return (
    <>
      {userEditTask?.task?._id && (
        <div className="edit-sec">
          <EditTask />
        </div>
      )}
      {userDeleteTask?.id && (
        <div className="delete-sec">
          <DeletePopUp />
        </div>
      )}
      {showCreateTask && (
        <div className="note-sec">
          <TaskCreate />
        </div>
      )}
      <section
        className={`home-container ${
          (showCreateTask || userDeleteTask?.id || userEditTask?.task?._id) &&
          "crate-task-on"
        }`}
      >
        <div className="left-section">
          <div className="section-up">
            <div className="brand-name-section">
              <div className="brand-name">
                <span className="brand-icon">
                  <SiCountingworkspro />
                </span>
                <span className="brand-text">Pro Manage</span>
              </div>
            </div>

            <div className="routes-container">
              <div
                className={`route-section ${
                  selectSection === "board" && "select-section"
                }`}
                onClick={() => handleClickSection("board")}
              >
                <span className="route-icon">
                  <PiLayoutThin />
                </span>
                <span className="route-text">Board</span>
              </div>
              <div
                className={`route-section ${
                  selectSection === "anyalytics" && "select-section"
                }`}
                onClick={() => handleClickSection("anyalytics")}
              >
                <span className="route-icon">
                  <GoDatabase />
                </span>
                <span className="route-text">Anyalytics</span>
              </div>
              <div
                onClick={() => handleClickSection("settings")}
                className={`route-section ${
                  selectSection === "settings" && "select-section"
                }`}
              >
                <span className="route-icon">
                  <IoSettingsOutline />
                </span>
                <span className="route-text">Settings</span>
              </div>
            </div>
          </div>
          <div className="section-down">
            <div className="logout-section">
              <span className="logout-icon">
                <IoLogOutOutline />
              </span>
              <span className="logout-text">Logout</span>
            </div>
          </div>
        </div>
        <div className="right-section">
          {selectSection === "board" ? (
            <BoardPage />
          ) : selectSection === "anyalytics" ? (
            <AnyalyticsPage />
          ) : (
            <SettingsPage />
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
