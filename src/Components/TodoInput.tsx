import { useRef, useEffect } from 'react';

const TodoInput = function({ todo, setTodo, editId, handleSubmit }) {
  const inputRef = useRef('null');

  useEffect(() => {
    inputRef.current.focus();
  });

  const updateTodo = function(event) {
    const todo = event.target.value;
    setTodo(todo);
  }

  return (
    <form className="form-group" onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={todo} 
        ref={inputRef} 
        placeholder="Enter your todo" 
        className="form-control" 
        onChange={updateTodo}
      />
      <button type="submit">{editId ? "EDIT" : "ADD"}</button>
    </form>
  );
};

export default TodoInput