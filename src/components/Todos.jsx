import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, setInput, updateTodo, setTodo } from "../features/todo/todoslice";

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const input = useSelector((state) => state.input);

  const dispatch = useDispatch();

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch("http://localhost:3000/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data)
      dispatch(setTodo(data));
    };
    getTodos()
  },[]);
  return (
    <div className="w-[80%] h-[70%] flex flex-col items-center gap-5">
      <h1 className="w-full text-center pt-3 text-2xl font-bold text-white">
        There are <span className="text-blue-500">{todos.length}</span> todos
      </h1>
      <ul className="flex flex-col h-full overflow-hidden overflow-y-auto scroll-smooth gap-5 p-5 rounded-lg w-[100%] items-center">
        {todos.map((todo, id) => {
          return (
            <li
              key={id}
              className="flex w-[80%] gap-3 bg-white text-lg capitalize font-semibold  rounded-lg justify-between p-3 hover:bg-slate-300 transition cursor-pointer"
            >
              <p className="px-4 py-1 text-sm border-2 rounded-full border-black">{todo.id}</p>
              <p className="w-full text-left">{todo.text}</p>
              <div className="btns flex gap-3">
                <button
                data-tooltip-id="tooltip-2"
                data-tooltip-content={'✒️'}
                  className="bg-blue-500 text-white rounded px-2"
                  onClick={() => {
                    dispatch(updateTodo({ id: todo.id, text: input }));
                  }}
                >
                  Edit
                </button>
                <button
                  data-tooltip-id="tooltip-1"
                  data-tooltip-content={'🗑️'}
                  onClick={() => {
                    dispatch(removeTodo(todo.id));
                  }}
                  className="bg-black text-red-600 rounded px-2"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todos;
