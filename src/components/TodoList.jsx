import React from "react";
import { TodoItem } from "./TodoItem";
import ListGroup from 'react-bootstrap/ListGroup'
export function TodoList({ todos, toggleTodo }) {
  return (
    <ListGroup as="ul">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
      ))}
    </ListGroup>
  );
}