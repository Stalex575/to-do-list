export default function Sidebar({
  setShowProjectForm,
  setShowTaskForm,
  saveCurrentList,
}) {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <button className="side-btn" onClick={() => setShowProjectForm(true)}>
          Create new project
        </button>
        <button className="side-btn" onClick={() => setShowTaskForm(true)}>
          Create new task
        </button>
        <button className="side-btn" onClick={() => saveCurrentList()}>
          Save list
        </button>
      </div>
    </div>
  );
}
