import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import "./EditTask.css";
import {
  createTodoAsync,
  editTaskAsync,
  reFatchAlltasksToggle,
} from "../../Redux/User/UserSlice";
import { decodeMonth, getCurrentDate, getMonth } from "../../Utils/Date";
import {
  clearDeleteTask,
  clearEditTask,
  editTask,
} from "../../Redux/Board/BoardSlice";

const EditTask = () => {
  const userEditTask = useSelector(editTask);

  const [inputValues, setInputValues] = useState(userEditTask?.task?.checklist);
  const allTicks = userEditTask?.task?.checklist.filter(
    ({ tick }) => tick === true
  );
  console.log(allTicks);
  let [inputsCount, setInputsCount] = useState(
    userEditTask?.task?.checklist[userEditTask?.task?.checklist.length - 1].id
  );
  const [priority, setPriority] = useState(userEditTask?.task?.priority);
  const [taskToggle, setTaskToggle] = useState(false);
  const [date, setDate] = useState(userEditTask?.task?.pureDate);
  const [title, setTilte] = useState(userEditTask?.task?.title);
  let [checkList, setCheckList] = useState(
    allTicks[0].id ? allTicks.length : 0
  );
  const [enableSaveButton, setEnableSaveButton] = useState(true);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const boardReFatchToggle = useSelector(reFatchAlltasksToggle);
  const handleToggleCreateTaskSec = () => {
    //dispatch(toggleCreateTask());
  };

  const handleCloseEditTask = () => {
    dispatch(clearEditTask());
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
    setLoader(true);
    let month = "";
    let currDate = "";
    if (date) {
      const monthNumber =
        date?.split("-")[1][0] === "0"
          ? date?.split("-")[1][1]
          : date?.split("-")[1];
      currDate = date.split("-")[2];

      month = date ? getMonth(monthNumber) : "";
    }

    const editTaskInfo = {
      _id: userEditTask.task._id,
      title: title,
      checklist: inputValues,
      priority: priority,
      dueDate: date ? `${month} ${currDate}th` : "",
      pureDate: date,
      colour:
        priority === "low-priority"
          ? "green"
          : priority === "high-priority"
          ? "red"
          : "blue",
    };
    console.log({ task: editTaskInfo, from: userEditTask.from });

    dispatch(editTaskAsync({ task: editTaskInfo, from: userEditTask.from }));
  };

  const handleSetTick = (index) => {
    let task = { ...inputValues[index] };
    let allTasks = [...inputValues];
    let alreadyTick = task.tick;
    if (alreadyTick) {
      task.tick = false;
      allTasks[index] = task;
      setCheckList(checkList - 1);
    } else {
      task.tick = true;
      allTasks[index] = task;
      setCheckList(checkList + 1);
    }
    setInputValues(allTasks);
    setTaskToggle(!taskToggle);
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
    let task = { ...inputValues[index] };
    task.text = text;
    let allTasks = [...inputValues];
    allTasks[index] = task;
    setInputValues(allTasks);
    setTaskToggle(!taskToggle);
  };

  useEffect(() => {
    if (loader) {
      setLoader(false);
      handleCloseEditTask();
    }
  }, [boardReFatchToggle]);
  return (
    <section className="edit-task">
      <div className="edit-task-sec">
        <div className="task-sec-up">
          <div className="task-input-sec">
            <label>
              Title <span className="red-dot">*</span>
            </label>
            <input
              onChange={(e) => handleSetTitle(e.target.value)}
              type="text"
              value={title}
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
                Checklist {`(${checkList}/${inputValues?.length})`}{" "}
                <span className="red-dot">*</span>
              </span>
            </div>
            <div className="task-inputs">
              {inputValues?.map(({ id, text }, i) => {
                return (
                  <>
                    <div key={i} className="task-box">
                      <div className="check-box">
                        <input
                          onChange={(e) => handleSetTick(i)}
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
              value={date}
              type="date"
            />
          </div>
          <div className="buttons-right">
            <button
              onClick={() => handleCloseEditTask()}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSaveTask()}
              disabled={!enableSaveButton ? true : false}
              className={`save-btn ${!enableSaveButton && "disable-btn"}`}
            >
              {!loader ? "Save" : <BeatLoader size={10} color="white" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditTask;
