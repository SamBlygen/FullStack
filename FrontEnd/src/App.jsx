import { useEffect, useState } from 'react';
import './App.css';

export const BASE_URL =import.meta.env.VITE_BASE_URL
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch('http://localhost:8080/todos');
      const data = await response.json();
      setTodos(data);
    }
    fetchTodos();
  }, []);

  function handleChange(e) {
    setInput(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const todo = { text: input };

    const response = await fetch('http://localhost:8080/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
    setInput('');
  }

  async function handleDelete(id) {
    if (!id) {
      console.error('Todo ID is undefined.');
      return;
    }

    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const newTodos = todos.filter((todo) => todo._id !== id);
      setTodos(newTodos);
    } else {
      console.log('Error deleting todo');
    }
  }

  async function handleComplete(todo) {
    console.log(todo)  // This will now correctly log the todo object
    if (!todo || !todo._id){
      console.log('Todo is not valid', todo)
      return;
    }
    const response = await fetch(`${BASE_URL}/todos/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...todo,
        completed: !todo.completed,
      }),
    });

    if (!response.ok) {
      console.error('Failed to update todo:', response.statusText);
      return; // Early exit if the response is not ok
  }
    const updatedTodo = await response.json();
    const updatedTodos = todos.map((t) => (t._id === updatedTodo._id ? updatedTodo : t));
    setTodos(updatedTodos);
}

 
 

  return (
    <>
      <h1>Todos:</h1>
      <ul>
  {todos.map((todo, index) => (
    <li key={todo._id || index}>
      <input
        type="checkbox"
        checked={todo.completed}
        // Change this line to pass the entire todo object
        onChange={() => handleComplete(todo)}  // Pass the whole todo object
      />
      {todo.text}
      <button onClick={() => handleDelete(todo._id)}> X</button>
    </li>
  ))}
</ul>


      <form onSubmit={handleSubmit}>
        <input  id="todo-input" name="todo" value={input} onChange={handleChange} />
        <button>Add</button>
      </form>
    </>
  );
}

export default App;

