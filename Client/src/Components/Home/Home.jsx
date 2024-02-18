import React, { useState } from "react";
import { SiCountingworkspro } from "react-icons/si";
import { PiLayoutThin } from "react-icons/pi";
import { GoDatabase } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import "./Home.css";
import BoardPage from "../../Pages/BoardPage/BoardPage";
import AnyalyticsPage from "../../Pages/AnyalyticsPage/AnyalyticsPage";
import SettingsPage from "../../Pages/SettingsPage/SettingsPage";
const Home = () => {
  const [selectSection, setSelectSection] = useState("board");

  const handleClickSection = (section) => {
    setSelectSection(section);
  };
  return (
    <section className="home-container">
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
  );
};

export default Home;
