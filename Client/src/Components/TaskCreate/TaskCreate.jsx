import React, { useEffect, useState } from "react";
import "./TaskCreate.css";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { toggleCreateTask } from "../../Redux/Board/BoardSlice";
import { getMonth } from "../../Utils/Date";
const TaskCreate = () => {
  const dispatch = useDispatch();
  const [inputValues, setInputValues] = useState([]);
  let [inputsCount, setInputsCount] = useState(0);
  const [priority, setPriority] = useState("");
  const [toggle, setToggle] = useState(false);
  const [date, setDate] = useState("");
  const [title, setTilte] = useState("");
  let [checkList, setCheckList] = useState(0);
  const [enableSaveButton, setEnableSaveButton] = useState(false);

  const handleToggleCreateTaskSec = () => {
    dispatch(toggleCreateTask());
  };
  const handleSetTitle = (text) => {
    if (inputValues[0]?.id && text && priority) {
      setEnableSaveButton(true);
    } else {
      setEnableSaveButton(false);
    }
    setTilte(text);
  };
  const handleSelectPriority = (priority) => {
    if (inputValues[0]?.id && title && priority) {
      setEnableSaveButton(true);
    } else {
      setEnableSaveButton(false);
    }
    setPriority(priority);
  };
  const handleSaveTask = () => {
    const monthNumber =
      date.split("-")[1][0] === "0"
        ? date.split("-")[1][1]
        : date.split("-")[1];
    const currDate = date.split("-")[2];

    const month = getMonth(monthNumber);
    const taskInfo = {
      title: title,
      tasks: inputValues,
      priority: priority,
      dueDate: `${month} ${currDate}th`,
    };
    //handleToggleCreateTaskSec();
    console.log(taskInfo);
  };

  const handleSetTick = (index) => {
    let taskIndex = inputValues.findIndex(({ id }) => id === index);
    let alreadyTick = inputValues[taskIndex].tick;
    if (alreadyTick) {
      inputValues[taskIndex].tick = false;
      setCheckList(checkList - 1);
    } else {
      inputValues[taskIndex].tick = true;
      setCheckList(checkList + 1);
    }
    setToggle(!toggle);
  };
  const handleDeleteInput = (index) => {
    const filterInputValues = inputValues.filter(({ id }) => id !== index);
    const taskIndex = inputValues.findIndex(({ id }) => id === index);

    if (filterInputValues[0]?.id && title && priority) {
      setEnableSaveButton(true);
    } else {
      setEnableSaveButton(false);
    }

    if (inputValues[taskIndex].tick) {
      setCheckList(checkList - 1);
    }

    setInputValues([...filterInputValues]);
  };
  const handleAddInputBox = (count) => {
    if (title && priority) {
      setEnableSaveButton(true);
    } else {
      setEnableSaveButton(false);
    }
    setInputValues([
      ...inputValues,
      {
        id: count + 1,
        tick: false,
        text: "",
      },
    ]);
    setInputsCount(count + 1);
  };
  const handleSetText = (index, text) => {
    inputValues[index].text = text;
    setToggle(!toggle);
  };
  return (
    <section
      // onMouseLeave={() => handleToggleCreateTaskSec()}
      className="task-container"
    >
      <div className="task-container-sec">
        <div className="task-sec-up">
          <div className="task-input-sec">
            <label>
              Title <span className="red-dot">*</span>
            </label>
            <input
              onChange={(e) => handleSetTitle(e.target.value)}
              type="text"
              placeholder="Enter Task Title"
            />
          </div>
          <div className="select-priority">
            <div className="task-title">
              <span>
                Select Priority <span className="red-dot">*</span>
              </span>
            </div>
            <div className="select-opt">
              <div
                onClick={() => handleSelectPriority("high-priority")}
                className={`opt ${
                  priority === "high-priority" && "select-priority-on"
                }`}
              >
                <span className="red"></span>
                <span className="select-text">HIGH PRIORITY</span>
              </div>
              <div
                onClick={() => handleSelectPriority("moderate-priority")}
                className={`opt ${
                  priority === "moderate-priority" && "select-priority-on"
                }`}
              >
                <span className="blue"></span>
                <span className="select-text">MODERATE PRIORITY</span>
              </div>
              <div
                onClick={() => handleSelectPriority("low-priority")}
                className={`opt ${
                  priority === "low-priority" && "select-priority-on"
                }`}
              >
                <span className="green"></span>
                <span className="select-text"> LOW PRIORITY</span>
              </div>
            </div>
          </div>
          <div className="task-section">
            <div>
              <span className="checklist-title">
                Checklist {`(${checkList}/${inputValues.length})`}{" "}
                <span className="red-dot">*</span>
              </span>
            </div>
            <div className="task-inputs">
              {inputValues.map(({ id, text }, i) => {
                return (
                  <>
                    <div key={i} className="task-box">
                      <div className="check-box">
                        <input
                          onChange={(e) => handleSetTick(id)}
                          checked={inputValues[i].tick}
                          type="checkbox"
                        />
                      </div>
                      <div className="task-delete">
                        <MdDelete
                          onClick={() => handleDeleteInput(id)}
                          color="#CF3636"
                        />
                      </div>

                      <div className="task-write">
                        <input
                          onChange={(e) => handleSetText(i, e.target.value)}
                          type="text"
                          value={text}
                          placeholder="Write task"
                        />
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

            <div className="task-add-box">
              <span className="task-add-icon">
                <IoIosAdd />
              </span>
              <span
                onClick={() => handleAddInputBox(inputsCount)}
                className="task-add-text"
              >
                Add New
              </span>
            </div>
          </div>
        </div>

        <div className="task-sec-down">
          <div className="buttons-left">
            <input
              onChange={(e) => setDate(e.target.value)}
              className="date-btn"
              type="date"
            />
          </div>
          <div className="buttons-right">
            <button
              onClick={() => handleToggleCreateTaskSec()}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSaveTask()}
              disabled={!enableSaveButton ? true : false}
              className={`save-btn ${!enableSaveButton && "disable-btn"}`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskCreate;
