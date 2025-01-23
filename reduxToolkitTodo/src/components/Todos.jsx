import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../features/TodoSlice';

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editableTodoId, setEditableTodoId] = useState(null);

  const handleEditToggle = (id) => {
    setEditableTodoId((prevId) => (prevId === id ? null : id));
  };

  const handleInputChange = (id, value) => {
    dispatch(updateTodo({ id, text: value }));
  };

  return (
    <ul>
      {todos.map((todo) => (
        <div key={todo.id}>
          <li>
            <input
              value={todo.text}
              onChange={(e) => handleInputChange(todo.id, e.target.value)}
              readOnly={editableTodoId !== todo.id}
            />
            <button onClick={() => handleEditToggle(todo.id)}>
              {editableTodoId === todo.id ? '📁' : '✏️'}
            </button>
            <button onClick={() => dispatch(removeTodo(todo.id))}>
              ❌
            </button>
          </li>
        </div>
      ))}
    </ul>
  );
}

export default Todos;
