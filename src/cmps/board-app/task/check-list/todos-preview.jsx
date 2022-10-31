import { useState, useRef } from "react";
import { IoCheckbox } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { saveTodo, removeTodo } from '../../../../store/actions/checklist.action.js';
import { useDispatch } from "react-redux";
import { MdMoreHoriz } from "react-icons/md";
import { DynamicModalCmp } from "../../../general/dynamic-modal-cmp";
import { userService } from "../../../../services/user.service.js";
import { useForm } from "../../../../hooks/useForm.js";


export const TodoPreview = ({ todo, checklistId, taskId, boardId, groupId, taskTitle }) => {
    const dispatch = useDispatch()

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isAddOpen, setIsAddOpen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const [fields, handleChange] = useForm({ title: todo.title });

    const modalDetails = useRef();
    const modalTitle = useRef();



    const onCloseModal = () => {
        setIsModalOpen(false);
    };

    const onOpenModal = (ev, txt) => {
        if (isModalOpen) {
            setIsModalOpen(false);
        }
        modalTitle.current = txt
        modalDetails.current = ev.target.getBoundingClientRect();
        setIsModalOpen(true);
    };

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

    return (
        <section className="todo-preview">
            {isModalOpen && (
                <div className="margin">
                    <DynamicModalCmp
                        modalDetails={modalDetails.current}
                        modalTitle={modalTitle.current}
                        onCloseModal={onCloseModal}
                        onRemoveTodo={onRemoveTodo}
                        width={'200px'}
                    />
                </div>
            )}
            <div className="todo-check-box-blank flex">
                <span className="add-action">  <MdMoreHoriz onClick={(ev) => onOpenModal(ev, 'Actions')} /></span>
                {!todo.isDone && <div onClick={onIsDone} className="todo-check-box">
                </div>} {todo.isDone && <div className="todo-check-box-checked" onClick={onIsDone}><IoCheckbox /></div>}
                <form >

                    <textarea onClick={() => setIsEditOpen(true)}
                        spellCheck={false}
                        name="title"
                        className={`todo-title ${todo.isDone ? 'checked' : ''}`}
                        value={fields.title}
                        onChange={handleChange}
                        onBlur={() => setIsEditOpen(false)}
                    >

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

