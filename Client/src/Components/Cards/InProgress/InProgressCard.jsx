import React, { useEffect, useState } from "react";
import "./InProgressCard.css";
import { SlOptions } from "react-icons/sl";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  backlogCollapse,
  inProgressCollapse,
  inProgressCollapseToggle,
  setDeleteTask,
  setInProgressCollapse,
  toggle,
} from "../../../Redux/Board/BoardSlice";

const InProgressCard = () => {
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const Toggle = useSelector(inProgressCollapseToggle);
  const inProgressStatus = useSelector(setInProgressCollapse);
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
    if (inProgressStatus) {
      setShowAllTasks(false);
    }
  }, [Toggle]);
  return (
    <section className="inprogress-container">
      <div className="inprogress-section">
        <div className="inprogress-section-up">
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

        <div className="inprogress-section-down">
          <div className="btn-left">
            <button>Feb 20th</button>
          </div>
          <div className="btn-right">
            <button>BACKLOG</button> <button>TO-DO</button>{" "}
            <button>DONE</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InProgressCard;
