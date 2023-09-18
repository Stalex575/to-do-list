import { useState } from "react";

export default function ProjectForm({ addNewProject, onCancel }) {
  const [projectName, setProjectName] = useState("");
  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};

    if (projectName.trim() === "") {
      newErrors.projectName = "Project name is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleProjectSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      addNewProject({ name: projectName, tasks: [] });
      setProjectName("");
    }
  }

  return (
    <div className="modal">
      <form onSubmit={(e) => handleProjectSubmit(e)} className="form">
        <input
          type="text"
          placeholder="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        {errors.projectName && <p className="error">{errors.projectName}</p>}
        <button type="submit" className="submit-btn">
          Create
        </button>
        <button type="button" onClick={onCancel} className="close-btn">
          Close
        </button>
      </form>
    </div>
  );
}
