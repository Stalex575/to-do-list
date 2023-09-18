import "./App.css";
import List from "./List";
import bg from "./bg.jpg";

function App() {
  return (
    <div className="wrapper">
      <img src={bg} alt="bg" className="background"></img>
      <h1 className="text-center">
        My To<span className="do">Do</span> List:
      </h1>
      <List></List>
    </div>
  );
}

export default App;
