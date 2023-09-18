import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ProjectForm from "./ProjectForm";
import TaskForm from "./TaskForm";
export default function List() {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [list, setList] = useState({
    tasks: [
      {
        name: "Homework",
        objective: "Finish your homework",
        time: "2023-08-31, 18:58",
        priority: "High",
      },
      {
        name: "Shopping",
        objective: "Go grocery shopping",
        time: "2023-08-31, 18:58",
        priority: "Medium",
      },
      {
        name: "Dishes",
        objective: "Wash the dishes",
        time: "2023-08-31, 18:58",
        priority: "Low",
      },
    ],
    projects: [
      {
        name: "My first project",
        tasks: [
          {
            name: "Vacuuming",
            objective: "Vacuum the living room",
            time: "2023-08-31, 18:58",
            priority: "High",
          },
          {
            name: "Cleaning",
            objective: "Tidy up your room",
            time: "2023-08-31, 18:58",
            priority: "Medium",
          },
        ],
      },
    ],
  });
  // localStorage.clear(); // uncomment for clearing the local storage
  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(null);
      return;
    }
    const results = list.tasks.filter((task) => {
      const taskNameMatch = task.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const taskDescriptionMatch = task.objective
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const taskPriorityMatch = task.priority
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return taskNameMatch || taskDescriptionMatch || taskPriorityMatch;
    });
    setSearchResults(results);
  }, [searchQuery, list.tasks]);

  useEffect(() => {
    const storedList = localStorage.getItem("list");
    if (storedList) {
      setList(JSON.parse(storedList));
    }
  }, []);

  function addNewTask(task) {
    if (projectId !== null) {
      setList((prevList) => {
        const updatedProjects = [...prevList.projects];
        updatedProjects[projectId].tasks.push(task);
        return {
          ...prevList,
          projects: updatedProjects,
        };
      });
      setProjectId(null);
    } else {
      setList((prevList) => ({
        ...prevList,
        tasks: [...prevList.tasks, task],
      }));
    }
    setShowTaskForm(false);
  }
  function updateTask(updatedTask) {
    if (projectId !== null) {
      setList((prevList) => {
        const updatedProjects = [...prevList.projects];
        const project = updatedProjects[projectId];
        project.tasks = project.tasks.map((task) =>
          task === editTask ? { ...updatedTask } : task
        );
        return {
          ...prevList,
          projects: updatedProjects,
        };
      });
    } else {
      setList((prevList) => ({
        ...prevList,
        tasks: prevList.tasks.map((task) =>
          task === editTask ? { ...updatedTask } : task
        ),
      }));
    }
  }

  function addNewProject(project) {
    setList((prevList) => ({
      ...prevList,
      projects: [...prevList.projects, project],
    }));
    setShowProjectForm(false);
  }
  function saveCurrentList() {
    localStorage.setItem("list", JSON.stringify(list));
  }
  function removeTaskFromList(taskIndex) {
    setList((prevList) => ({
      ...prevList,
      tasks: prevList.tasks.filter((_, index) => index !== taskIndex),
    }));
  }
  function removeTaskFromProject(projectIndex, taskToRemove) {
    setList((prevList) => {
      const updatedProjects = [...prevList.projects];
      updatedProjects[projectIndex].tasks = updatedProjects[
        projectIndex
      ].tasks.filter((task) => task !== taskToRemove);
      return {
        ...prevList,
        projects: updatedProjects,
      };
    });
  }

  return (
    <div>
      <div className="searchbar-container">
        <input
          className="searchbar"
          type="text"
          placeholder="Search tasks by name, description, or priority"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>

      {searchResults ? (
        <>
          <h2>Search results:</h2>
          <div className="results-container">
            {searchResults.map((task, taskIndex) => (
              <div
                key={taskIndex}
                className={`task-container search-card ${
                  task.priority === "High"
                    ? "high-priority"
                    : task.priority === "Medium"
                    ? "medium-priority"
                    : "low-priority"
                }`}
              >
                <h3>{task.name}</h3>
                <ul>
                  <li>Description: {task.objective}</li>
                  <li>Time: {task.time}</li>
                  <li>Priority: {task.priority}</li>
                </ul>
                <button
                  className="close-btn"
                  onClick={() => removeTaskFromList(taskIndex)}
                >
                  Remove
                </button>
                <button
                  className="action-button"
                  onClick={() => {
                    setEditMode(true);
                    setEditTask(task);
                    setShowTaskForm(true);
                  }}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex-container">
          {list.projects && (
            <div className="container">
              <h2>My projects:</h2>
              {list.projects.map((project, projectIndex) => (
                <div key={projectIndex} className="project-container">
                  <div className="project-header">
                    <h3 className="project-title">{project.name}</h3>
                    <button
                      className="action-button"
                      onClick={() => {
                        setShowTaskForm(true);
                        setProjectId(projectIndex);
                      }}
                    >
                      Add a task
                    </button>
                  </div>

                  {project.tasks.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className={`task-container ${
                        task.priority === "High"
                          ? "high-priority"
                          : task.priority === "Medium"
                          ? "medium-priority"
                          : "low-priority"
                      }`}
                    >
                      <h3>{task.name}</h3>
                      <ul>
                        <li>Description: {task.objective}</li>
                        <li>Time: {task.time}</li>
                        <li>Priority: {task.priority}</li>
                      </ul>
                      <button
                        className="close-btn"
                        onClick={() =>
                          removeTaskFromProject(projectIndex, task)
                        }
                      >
                        Remove
                      </button>
                      <button
                        className="action-button"
                        onClick={() => {
                          setProjectId(projectIndex);
                          setEditMode(true);
                          setEditTask(task);
                          setShowTaskForm(true);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {list.tasks && (
            <div className="container">
              <h2>My other tasks:</h2>
              {list.tasks.map((task, taskIndex) => (
                <div
                  key={taskIndex}
                  className={`task-container ${
                    task.priority === "High"
                      ? "high-priority"
                      : task.priority === "Medium"
                      ? "medium-priority"
                      : "low-priority"
                  }`}
                >
                  <h3>{task.name}</h3>
                  <ul>
                    <li>Description: {task.objective}</li>
                    <li>Time: {task.time}</li>
                    <li>Priority: {task.priority}</li>
                  </ul>
                  <button
                    className="close-btn"
                    onClick={() => removeTaskFromList(taskIndex)}
                  >
                    Remove
                  </button>
                  <button
                    className="action-button"
                    onClick={() => {
                      setEditMode(true);
                      setEditTask(task);
                      setShowTaskForm(true);
                    }}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showProjectForm && (
        <ProjectForm
          addNewProject={addNewProject}
          onCancel={() => {
            setShowProjectForm(false);
          }}
        ></ProjectForm>
      )}
      {showTaskForm && (
        <TaskForm
          addNewTask={addNewTask}
          editMode={editMode}
          editTask={editTask}
          updateTask={updateTask}
          onCancelEdit={() => {
            setEditMode(false);
            setEditTask(null);
            setProjectId(null);
            setShowTaskForm(false);
          }}
        ></TaskForm>
      )}
      <Sidebar
        setShowProjectForm={setShowProjectForm}
        setShowTaskForm={setShowTaskForm}
        saveCurrentList={saveCurrentList}
      ></Sidebar>
    </div>
  );
}
