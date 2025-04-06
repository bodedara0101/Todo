import "./App.css";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import { Tooltip } from "react-tooltip";
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <ToastContainer />
    <Tooltip id="tooltip-1" arrowColor="red"/>
    <Tooltip id="tooltip-2" arrowColor="blue"/>
      <h1 className="text-5xl fixed top-5 left-44 -translate-x-1/2 font-semibold first-letter:text-red-500 cursor-pointer">
        My Todo App
      </h1>
      <div className="container border-x-gray-900 h-screen flex flex-col justify-start items-center gap-10 ">
      <AddTodo />
      <Todos />
      </div>
    </>
  );
}

export default App;
