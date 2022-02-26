import React, { Fragment, useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./components/TodoList";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


const KEY = "todoApp.todos";

export function App() {
  const todoTaskRef = useRef();
  const todoDineroRef = useRef();

  const [todos, setTodos] = useState([
    { id: 1, task: "Tarea ", dinero: 100, marcado:false, color:"sucess" },
  ]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.marcado = !todo.marcado;
    setTodos(newTodos);
  };

  const handleTodoAdd = (event) => {
    const task = todoTaskRef.current.value;
    const dinero = todoDineroRef.current.value
    var color;
    if (task === "") return;
    if (dinero === "") return;
    if (parseInt(dinero)>0){
        color = "success";
    }else {
        color = "danger";
    }

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), task, dinero, color}];
    });

    todoTaskRef.current.value = null;
    todoDineroRef.current.value = null;
  };

  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.marcado);
    setTodos(newTodos);
  };
  var totalBalance = 0;
  var positivos = todos.filter((todo) => todo.dinero > 0);
  var totalPositivos = 0;
    for(let p of positivos){
        totalPositivos += parseInt(p.dinero);
    }
    var negativos = todos.filter((todo) => parseInt(todo.dinero) < 0);
    var totalNegativos = 0;
    for(let n of negativos){
        totalNegativos += parseInt(n.dinero);
    }
    totalBalance = parseInt(totalPositivos) + parseInt(totalNegativos);

  return (
      <Fragment>
    <div className="row justify-content-center  align-items-center mx-auto">
    <div className="col-6 mb-3 mt-3">
      <TodoList todos={todos} toggleTodo={toggleTodo} />
    </div>
    </div>
    <div className="row justify-content-center  align-items-center mx-auto">
    <div className="col-6">
    <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon1">Nombre</InputGroup.Text>
    <FormControl
      ref ={todoTaskRef}
      placeholder="Nombre"
      aria-label="Nombre"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
  <InputGroup className="mb-3">
    <InputGroup.Text id="basic-addon1">Ingreso/Gasto</InputGroup.Text>
    <FormControl
      ref={todoDineroRef}
      placeholder="Ingreso/Gasto"
      aria-label="Ingreso/Gasto"
      aria-describedby="basic-addon1"
    />
  </InputGroup>
  </div>
  </div>
  <div className="row justify-content-center  align-items-center mx-auto">
  <div className="col-6 ">
      <Button variant="success" onClick={handleTodoAdd}>Añadir</Button>
      <Button variant="danger" onClick={handleClearAll}>Eliminar</Button>
  </div>
  </div>
  <div className="mx-auto text-center col-12">
        <h1>Ingresos: {totalPositivos+"€"}</h1>
        <h1>Gastos: {totalNegativos+"€"}</h1>
        <h1>Balance total: {totalBalance+"€"}</h1>
 </div>
 </Fragment>
  );
}