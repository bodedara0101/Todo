import { configureStore } from "@reduxjs/toolkit";
import todoslice from "../features/todo/todoslice";

export const store = configureStore({
    reducer: todoslice
});