import React from "react";
import ListGroup from 'react-bootstrap/ListGroup'

export function TodoItem({ todo, toggleTodo }) {
  const { id, task, dinero, marcado, color } = todo;

  const handleTodoClick = () => {
    toggleTodo(id);
  };

  return (
    
    <ListGroup.Item as="li" variant={color} >
      <input type="checkbox" checked={marcado} onChange={handleTodoClick} />{task+": "+dinero+"€"} 
    </ListGroup.Item>
  );
}