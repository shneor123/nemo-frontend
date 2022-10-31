import { useState } from "react";
import { utilService } from "../../../../services/util.service.js";
import { TodoPreview } from "./todos-preview.jsx";
import { saveTodo } from "../../../../store/actions/checklist.action.js";
import { useDispatch } from "react-redux";
import { useForm } from "../../../../hooks/useForm.js";

export const TodosList = ({ todos, checklistId, taskId, boardId, groupId, taskTitle }) => {
  console.log(todos);
  const [isAddOpen, setIsAddOpen] = useState();
  const [fields, handleChange, clearFields] = useForm({ title: "" });
  const dispatch = useDispatch();

  const onAddTodo = () => {
    const updatedTodo = {}
    updatedTodo.title = fields.title
    updatedTodo.id = utilService.makeId()
    updatedTodo.isDone = false

    // todos.push(updateTodo)
    dispatch(saveTodo(updatedTodo, checklistId, boardId, groupId, taskId));
    clearFields()
  };

  const onHandleKeySubmit = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      onAddTodo();
    }
  };

  return (
    <section className="todos-list">
      {todos.map((todo) => (
        <TodoPreview
          key={todo.id}
          todo={todo}
          checklistId={checklistId}
          taskId={taskId}
          boardId={boardId}
          groupId={groupId}
          taskTitle={taskTitle}

        />
      ))}
      {isAddOpen && (
        <form className="todo-form">
          <textarea
          autoFocus
            name="title"
            className="add-todo-title"
            value={fields.title}
            onChange={handleChange}
            onKeyDown={onHandleKeySubmit}
            onBlur={() => setIsAddOpen(false)}
            placeholder="Add an item"
          ></textarea>
          <div className="add-todo-btns">
            <button onMouseDown={onAddTodo}>Add</button>
            <span className="cancel" onClick={() => setIsAddOpen(false)}>
              Cancel
            </span>
          </div>
        </form>
      )}

      {!isAddOpen && (
        <div className="todo-add">
          <button onClick={() => setIsAddOpen(true)}>Add an item</button>
        </div>
      )}
    </section>
  );
};
