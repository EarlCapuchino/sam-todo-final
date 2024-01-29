import { useState, useEffect } from 'react';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos when the component mounts
  useEffect(() => {
    fetch('/api/getTodos')
      .then((response) => response.json())
      .then((data) => setTodos(data.todos));
  }, []);

  const addTodoHandler = async () => {
    await fetch('/api/addTodo', {
      method: 'POST',
      body: JSON.stringify({ text: newTodo }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setNewTodo('');
    // Optionally, fetch todos again to update the list
  };

  const deleteTodoHandler = async (todoId) => {
    await fetch('/api/deleteTodo', {
      method: 'DELETE',
      body: JSON.stringify({ id: todoId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Optionally, fetch todos again to update the list
  };

  return (
    <div>
      <input 
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
      />
      <button onClick={addTodoHandler}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.text}
            <button onClick={() => deleteTodoHandler(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
