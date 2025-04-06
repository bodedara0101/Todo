import express from "express";
import db from "./database/db.js";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())
db.connect();

const addTodo = `insert into todos (text,id) values ?`; 

const selectAll = "select * from todos";

app.get("/todos", (req, res) => {
  db.query(selectAll, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));