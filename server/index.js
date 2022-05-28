const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const router = express.Router();
const app = express();
// add router in express app
app.use("/", router);
const fs = require("fs");
const { allPass } = require("ramda");
const fileName = "/Users/anshuman/Desktop/nodeJs/demo1.json";
const file = require(fileName);
const jsonString = fs.readFileSync(fileName);
const customer = JSON.parse(jsonString);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
const todos = [
  {
    text: "This is a sampe todo",
    isDone: false,
  },
];
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.set("views", path.resolve(__dirname, "../client/build"));
app.post("/todo", (req, res) => {
  res.send(todos);
});
app.post("/addTodo", (req, res) => {
  todos.push({
    text: req.body.text,
    isDone: false,
  });
  res.send(todos);
});
app.post("/removeTodo", (req, res) => {
  todos.splice(req.body.index, 1);
  res.send(todos);
});

app.post("/markTodo", (req, res) => {
  todos[req.body.index].isDone = true;
  res.send(todos);
});
app.listen(3000, () => {
  console.log("Started on PORT 3000");
});
