/* eslint-disable no-undef */
import React, { useEffect } from "react";
import "./App.css";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function Todo({ todo, index, removeTodo, markTodo }) {
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
        {todo.text}
      </span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>
          ✓
        </Button>{" "}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>
          ✕
        </Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <b>Add Todo</b>
        </Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add new todo"
        />
      </Form.Group>
      <Button variant="primary mb-3" type="submit">
        Submit
      </Button>
    </Form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([]);

  const addTodo = (text) => {
    axios.post("/addTodo", { text }).then((data) => {
      console.log("-----add todo", data.data);
      setTodos(data.data);
    });
  };

  const markTodo = (index) => {
    axios.post("/markTodo", { index }).then((data) => {
      console.log("-----mark todo", data.data);
      setTodos(data.data);
    });
  };

  const removeTodo = (index) => {
    axios.post("/removeTodo", { index }).then((data) => {
      console.log("-----remove todo", data.data);
      setTodos(data.data);
    });
  };
  const setData = () =>
    axios.post("/todo").then((data) => {
      console.log("-----set todo", data.data);
      setTodos(data.data);
    });
  useEffect(() => {
    setData();
  }, []);
  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                  todo={todo}
                  index={index}
                  removeTodo={removeTodo}
                  markTodo={markTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
