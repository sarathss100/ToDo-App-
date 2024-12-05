import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const TodoList = function({ todos, onComplete, onEdit, onDelete }) {
  const pendingTodos = todos.filter(todo => !todo.status);
  const completedTodos = todos.filter(todo => todo.status);

  return (
    <div className="list">
      <ul>
      
        {pendingTodos.length > 0 && (
          <div className="todo-section">
            <h3 style={{ color: 'black', marginTop: '20px', marginBottom: '10px' }}>
              Pending Tasks ({pendingTodos.length})
            </h3>
            {pendingTodos.map((todo,index) => (
              <li className="form-control" key={todo.id}>
                <div className="todo-item">
                  <input 
                    type="checkbox"
                    checked={todo.status}
                    onChange={() => onComplete(todo.id)}
                    className="todo-checkbox"
                  />
                  <div className="todo-text">
                  {`${index + 1}. ${todo.list}`}
                  </div>
                </div>
                <span>
                  <AiOutlineEdit 
                    id="edit" 
                    title="Edit" 
                    onClick={() => onEdit(todo.id)} 
                  />
                  <AiOutlineDelete 
                    id="delete" 
                    title="Delete" 
                    onClick={() => onDelete(todo.id)}
                  />
                </span>
              </li>
            ))}
          </div>
        )}

    
        {completedTodos.length > 0 && (
          <div className="todo-section">
            <h3 style={{ color: 'black', marginTop: '20px', marginBottom: '10px' }}>
              Completed Tasks ({completedTodos.length})
            </h3>
            {completedTodos.map(todo => (
              <li className="form-control" key={todo.id}>
                <div className="todo-item">
                  <input 
                    type="checkbox"
                    checked={todo.status}
                    onChange={() => onComplete(todo.id)}
                    className="todo-checkbox"
                  />
                  <div className="completed todo-text">
                    {todo.list}
                  </div>
                </div>
                <span>
                  {/* <AiOutlineEdit 
                    id="edit" 
                    title="Edit" 
                    onClick={() => onEdit(todo.id)} 
                  /> */}
                  <AiOutlineDelete 
                    id="delete" 
                    title="Delete" 
                    onClick={() => onDelete(todo.id)}
                  />
                </span>
              </li>
            ))}
          </div>
        )}

        {todos.length === 0 && (
          <p style={{ color: 'black', textAlign: 'center', marginTop: '20px' }}>
            No tasks added yet!
          </p>
        )}
      </ul>
    </div>
  );
};

export default TodoList