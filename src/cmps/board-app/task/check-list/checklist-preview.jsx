import { useRef, useState } from "react";
import { useDispatch } from 'react-redux';
import { IoMdCheckboxOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { TodosList } from './todo-list'
import { saveChecklist } from '../../../../store/actions/checklist.action';
import { ChecklistProgressBar } from './checklist-progress'
import { useForm } from '../../../../hooks/useForm';
import { DynamicModalCmp } from "../../../general/dynamic-modal-cmp";



export const ChecklistPreview = ({ checklist, onRemoveChecklist, task, boardId, groupId }) => {
    const dispatch = useDispatch()
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [fields, handleChange] = useForm({ title: checklist.title });

    const onSaveTask = () => {
        checklist.title = fields.title
        dispatch(saveChecklist(checklist, boardId, groupId, task.id));
    }


    const [isModalOpen, setIsModalOpen] = useState(false)
    const modalDetails = useRef()
    const modalTitle = useRef()

    const onCloseModal = () => {
        setIsModalOpen(false)
    };

    const onOpenModal = (ev, txt) => {
        if (isModalOpen) {
            setIsModalOpen(false)
        }
        modalTitle.current = txt
        modalDetails.current = ev.target.getBoundingClientRect()
        setIsModalOpen(true)
    }



    return (
        <section className="checklist-preview ">
            {isModalOpen && (
                <DynamicModalCmp
                    modalDetails={modalDetails.current}
                    modalTitle={modalTitle.current}
                    type={modalTitle}
                    onCloseModal={onCloseModal}
                    onRemoveChecklist={onRemoveChecklist}
                    checklist={checklist}
                />
            )}
            <div className='title-container  '>
                <div className='checklist-title'><span className='icon-check'><IoMdCheckboxOutline /></span>
                    <form >
                        <textarea onClick={() => setIsEditOpen(true)}
                            name="title"
                            className="check-title"
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
                    <div className='checklist-delete'>
                        <button onClick={(ev) => { onOpenModal(ev, 'checklist-delete') }}>Delete</button>
                    </div>
                </div>
            </div>
            <ChecklistProgressBar checklist={checklist} />
            <TodosList
                checklistId={checklist.id}
                todos={checklist.todos}
                taskId={task.id}
                boardId={boardId}
                groupId={groupId}
                taskTitle={task.title}
            />
        </section>
    )

}