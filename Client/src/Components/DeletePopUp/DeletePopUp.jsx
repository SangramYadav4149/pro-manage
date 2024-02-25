import React, { useEffect, useState } from "react";
import "./DeletePopUp.css";
import { useDispatch, useSelector } from "react-redux";
import { clearDeleteTask, deleteTask } from "../../Redux/Board/BoardSlice";
import {
  deleteTaskAsync,
  reFatchAlltasksToggle,
} from "../../Redux/User/UserSlice";

import { BeatLoader } from "react-spinners";

const DeletePopUp = () => {
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const deleteTaskInfo = useSelector(deleteTask);
  const boardReFatchToggle = useSelector(reFatchAlltasksToggle);

  const handleClearDeleteTask = () => {
    dispatch(clearDeleteTask());
  };

  const handleDeleteTask = () => {
    setLoader(true);
    dispatch(deleteTaskAsync(deleteTaskInfo));
  };

  useEffect(() => {
    if (loader) {
      setLoader(false);
      handleClearDeleteTask();
    }
  }, [boardReFatchToggle]);
  return (
    <section className="delete-popup-container">
      <div className="delete-popup-section">
        <div className="info">
          <span>Are you sure you want to Delete?</span>
        </div>
        <div className="buttons">
          <button onClick={() => handleDeleteTask()} className="delete">
            {!loader ? "Yes, Delete" : <BeatLoader size={10} color="white" />}
          </button>
          <button onClick={() => handleClearDeleteTask()} className="cancel">
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeletePopUp;
