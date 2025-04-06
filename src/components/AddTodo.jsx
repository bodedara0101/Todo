import React, { useState } from "react";
import { addTodo, setInput } from "../features/todo/todoslice";
import { useDispatch } from "react-redux";

const AddTodo = () => {
  const [input, setinput] = useState("");
    const dispatch = useDispatch()


    const handleAddTodo = (e)=>{
        e.preventDefault();
        dispatch(addTodo(input))
        setinput('')
    }
  return (
    <>
      {/* <datalist id="todos">
    <option value="make html project" />
    <option value="css projects " />
    <option value="mern projects" />
    <option value="react projects" />
    <option value="vue projects" />
  </datalist> */}
        <form
          onSubmit={handleAddTodo}
          className="bg-slate-400 p-10 rounded-b-xl flex justify-center gap-10 w-full"
        >
          <input
            type="text"
            id="todotext"
            value={input}
            autoFocus
            spellCheck={false}
            // list="todos"
            onChange={(e) => {
              setinput(e.target.value);
              dispatch(setInput(e.target.value));
            }}
            placeholder='add todo max length 60'
            className="w-[30%] rounded px-2 h-10"
            maxLength={60}
          />
          <button
            type="submit"
            className="bg-blue-500 text-xl px-2 rounded text-white"
          >
            Add
          </button>
        </form>
    </>
  );
};

export default AddTodo;
