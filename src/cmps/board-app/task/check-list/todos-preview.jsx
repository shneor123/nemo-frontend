import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { IoCheckbox } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { MdMoreHoriz } from "react-icons/md";
import { saveTodo, removeTodo } from '../../../../store/actions/checklist.action';
import { userService } from "../../../../services/basic/user.service";
import { useForm } from "../../../../hooks/useForm";
import { setModal } from "../../../../store/actions/app.actions"


export const TodoPreview = ({ todo, checklistId, taskId, boardId, groupId, taskTitle }) => {
    const dispatch = useDispatch()
    const actionsRef = useRef()
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [fields, handleChange] = useForm({ title: todo.title });

    const onSaveTask = () => {
        const todo = {}
        todo.title = fields.title
        dispatch(saveTodo(todo, checklistId, boardId, groupId, taskId))
        setIsEditOpen(false)
    }

    const onIsDone = () => {
        todo.isDone = !todo.isDone
        const activity = {
            txt: `${todo.isDone ? 'completed' : 'marked'}  ` + todo.title + `${todo.isDone ? '' : ' incomplete'}` + ' on this card',
            boardTxt: `${todo.isDone ? 'completed' : 'marked'}  ` + todo.title + `${todo.isDone ? '' : ' incomplete'}` + ' on ' + taskTitle,
            byMember: userService.getLoggedinUser()
        }
        dispatch(saveTodo(todo, checklistId, boardId, groupId, taskId, activity))
    }

    const onRemoveTodo = () => {
        dispatch(removeTodo(todo, checklistId, boardId, groupId, taskId))
    }

    const onOpenModal = (ev, modal) => {
        dispatch(setModal(modal))
    }

    return (
        <section className="todo-preview">
            <div className="todo-check-box-blank flex">
                <span className="add-action" ref={actionsRef}>
                    <MdMoreHoriz onClick={(ev) => onOpenModal(ev, {
                        element: actionsRef.current,
                        category: 'Actions',
                        title: 'Actions',
                        props: { element: actionsRef.current, onRemoveTodo },
                    })} /></span>
                {!todo.isDone && <div onClick={onIsDone} className="todo-check-box">
                </div>} {todo.isDone && <div className="todo-check-box-checked" onClick={onIsDone}><IoCheckbox /></div>}
                <form >
                    <textarea onClick={() => setIsEditOpen(true)}
                        spellCheck={false}
                        name="title"
                        className={`todo-title ${todo.isDone ? 'checked' : ''}`}
                        value={fields.title}
                        onChange={handleChange}
                        onBlur={() => setIsEditOpen(false)}>
                    </textarea>
                    {isEditOpen && <div className="edit-checklist-title">
                        <button onMouseDown={onSaveTask}>Save</button>
                        <span className="cancel" onClick={() => setIsEditOpen(false)}>
                            <IoMdClose />
                        </span>
                    </div>}
                </form>
            </div>
        </section >
    )


}

