import { useState, useEffect } from 'react';
import "./Todo.css";
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import Swal from 'sweetalert2';

const Todo = function() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      return parsedTodos.filter(todo => !todo.status);
    }
    return [];
  });
  
  const [editId, setEditId] = useState(0);

  useEffect(() => {
    const pendingTodos = todos.filter(todo => !todo.status);
    localStorage.setItem('todos', JSON.stringify(pendingTodos));
  }, [todos]);

  const isDuplicateTodo = function(newTodo) {
    return todos.some(todo => todo.list.toLowerCase() === newTodo.toLowerCase());
  }

  const addTodo = function() {
    if (todo === '') {
      Swal.fire({
        title: 'Please Enter Something!',
        text: 'Empty field!',
        icon: 'error',
        confirmButtonText: 'Okay'
        });
        return;
    }
    
    if (todo !== '') {
      if (isDuplicateTodo(todo)) {
        Swal.fire({
        title: 'Duplicate Todo!',
        text: 'This todo already exists.',
        icon: 'error',
        confirmButtonText: 'Okay'
        });
        return;
      }

      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      setTodo('');
    }

    if (editId) {
      const updatedTodo = todos.map((to) =>
        to.id === editId
          ? { id: to.id, list: todo, status: to.status }
          : to
      );

      setTodos(updatedTodo);
      setTodo('');
      setEditId(0);
    }
  };

  const onDelete = function(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onComplete = function(id) {
    let complete = todos.map((todo) => {
      if (todo.id === id) {
        return ({ ...todo, status: !todo.status });
      }
      return todo;
    });
    setTodos(complete);
  };

  const onEdit = function(id) {
    const editTodo = todos.find(todo => todo.id === id);
    setTodo(editTodo.list);
    setEditId(editTodo.id);
  };

  const handleSubmit = function(e) {
    e.preventDefault();
    addTodo();
  };

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <TodoInput 
        todo={todo}
        setTodo={setTodo}
        editId={editId}
        handleSubmit={handleSubmit}
      />
      <TodoList 
        todos={todos}
        onComplete={onComplete}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default Todo;