import { useEffect, useState } from "react";

export default function TaskForm({
  addNewTask,
  editMode,
  editTask,
  updateTask,
  onCancelEdit,
}) {
  const [taskName, setTaskName] = useState(editMode ? editTask.name : "");
  const [taskDesc, setTaskDesc] = useState(editMode ? editTask.objective : "");
  const [taskTime, setTaskTime] = useState(
    editMode ? editTask.time.split(", ")[1] : ""
  );
  const [taskDate, setTaskDate] = useState(
    editMode ? editTask.time.split(", ")[0] : ""
  );
  const [taskPriority, setTaskPriority] = useState(
    editMode ? editTask.priority : "High"
  );
  const [formattedTime, setFormattedTime] = useState("");

  const [errors, setErrors] = useState({});
  useEffect(() => {
    setFormattedTime(`${taskDate}, ${taskTime}`);
  }, [taskDate, taskTime]);

  function validateForm() {
    const newErrors = {};

    if (taskName.trim() === "") {
      newErrors.taskName = "Task name is required";
    }
    if (taskDesc.trim() === "") {
      newErrors.taskDesc = "Task description is required";
    }
    if (taskDate.trim() === "") {
      newErrors.taskDate = "Task date is required";
    }

    if (taskTime.trim() === "") {
      newErrors.taskTime = "Task time is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }
  function handleTaskSubmit(e) {
    e.preventDefault();

    if (editMode && validateForm()) {
      updateTask({
        name: taskName,
        objective: taskDesc,
        time: `${taskDate}, ${taskTime}`,
        priority: taskPriority,
      });

      onCancelEdit();
    } else {
      if (validateForm()) {
        addNewTask({
          name: taskName,
          objective: taskDesc,
          time: formattedTime,
          priority: taskPriority,
        });
        setTaskName("");
        setTaskDesc("");
        setTaskTime("");
        setTaskDate("");
        setTaskPriority("Low");
      }
    }
  }

  return (
    <div className="modal">
      <form onSubmit={(e) => handleTaskSubmit(e)} className="form">
        <input
          type="text"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        {errors.taskName && <p className="error">{errors.taskName}</p>}

        <input
          type="text"
          placeholder="Task description"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
        />
        {errors.taskDesc && <p className="error">{errors.taskDesc}</p>}
        <input
          type="date"
          placeholder="Date"
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
        />
        {errors.taskDate && <p className="error">{errors.taskDate}</p>}

        <input
          type="time"
          placeholder="Time"
          value={taskTime}
          onChange={(e) => setTaskTime(e.target.value)}
        />
        {errors.taskTime && <p className="error">{errors.taskTime}</p>}

        <select
          onChange={(e) => {
            setTaskPriority(e.target.value);
          }}
          value={taskPriority}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button type="submit" className="submit-btn">
          Create
        </button>
        <button type="button" onClick={onCancelEdit} className="close-btn">
          Close
        </button>
      </form>
    </div>
  );
}
