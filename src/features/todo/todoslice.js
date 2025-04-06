import { createSlice, nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  todos: [{ id: 1, text: "make a basic redux project" }],
  input: "",
};

export const todoslice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      if (!action.payload.length <= 0) {
        state.todos.push(todo);
        toast.success(`Todo added`);
      } else {
        alert("enter valid todo");
      }
    },
    setTodo: (state, action) => {
      state.todos = action.payload
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            text: action.payload.text,
          };
        }
        return todo;
      });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      toast.success(`Todo ${action.payload} deleted`);
    },
    setInput: (state, action) => {
      state.input = action.payload;
      console.log(state.input);
    },
  },
});

export const { addTodo, removeTodo, updateTodo, setInput,setTodo } = todoslice.actions;

export default todoslice.reducer;
