import { useState } from "react";
import { Popconfirm } from 'antd'; // Import Popconfirm component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Import the required Font Awesome icons
import forestBackground from "./download (1).jpg"; // Import the forest background image

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const addTasks = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { name: task.trim(), completed: false }]);
      setTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <div
      className="flex flex-col items-center min-h-screen"
      style={{
        backgroundImage: `url(${forestBackground})`, // Apply the forest background image
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-4xl m-16 font-bold text-red-600">Simple Todo App</h1>
      <div className="p-6">
        <input
          className="bg-gray-200 rounded-md p-4 m-4 shadow-inner focus:outline-none focus:ring-2 focus:ring-green-500"
          type="text"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
          placeholder="Create a new todo"
        />
        <button
          onClick={addTasks}
          className="bg-white-500 text-white p-3 m-3 rounded-md font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <FontAwesomeIcon icon={faPlusCircle} className="mr-2" /> 
        </button>
      </div>
      <div>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task, index) => (
              <div
                className="flex bg-white m-4 py-4 pl-12 pr-4 rounded-md shadow-md hover:shadow-lg"
                key={index}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                  className="mr-4"
                />
                <span
                  className={`self-center font-semibold pr-10 mr-6 ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                  {task.name}
                </span>
                <Popconfirm
                  title="Are you sure you want to delete this task?"
                  onConfirm={() => deleteTask(index)}
                  okText={<span className="text-red-500">Yes, Delete</span>}
                  cancelText="No"
                  okButtonProps={{ className: "bg-red-500 text-white font-bold rounded-md" }}
                  cancelButtonProps={{ className: "bg-gray-300 text-gray-800 font-bold rounded-md" }}
                >
                  <button
                    className="bg-red-500 text-white p-2 rounded-md font-bold hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </Popconfirm>
              </div>
            ))}
          </ul>
        ) : (
          <div className="text-2xl m-16 font-bold text-red-600">
            <p></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
