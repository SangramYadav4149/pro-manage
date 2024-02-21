import React from "react";
import "./DeletePopUp.css";
import { useDispatch } from "react-redux";
import { clearDeleteTask, setDeleteTask } from "../../Redux/Board/BoardSlice";
const DeletePopUp = () => {
  const dispatch = useDispatch();
  const handleClearDeleteTask = () => {
    dispatch(clearDeleteTask());
  };
  return (
    <section className="delete-popup-container">
      <div className="delete-popup-section">
        <div className="info">
          <span>Are you sure you want to Delete?</span>
        </div>
        <div className="buttons">
          <button className="delete">Yes, Delete</button>
          <button onClick={() => handleClearDeleteTask()} className="cancel">
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

export default DeletePopUp;
