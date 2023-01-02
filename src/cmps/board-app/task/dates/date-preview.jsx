import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IoCheckbox } from 'react-icons/io5';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
import { utilService } from '../../../../services/util.service'
import { saveTask } from '../../../../store/actions/task.action'
import { DynamicModalCmp } from '../../../general/dynamic-modal-cmp'

export function DatePreview({ task, boardId, groupId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalDetails = useRef();
    const modalTitle = useRef();
    const dispatch = useDispatch()

    const toggleIsDone = () => {
        task.isDone = !task.isDone
        dispatch(saveTask(task, boardId, groupId))
    }

    const getDueStatus = () => {
        if (task.isDone) return { txt: 'complete', className: 'complete' };
        if (Date.now() > task.dueDate) {
            return { txt: 'overdue', className: 'over-due' };
        }
    }
    const onCloseModal = () => {
        setIsModalOpen(false);
    };

    const onOpenModal = (ev, txt) => {
        if (isModalOpen) {
            setIsModalOpen(false);
        }
        modalTitle.current = txt;
        modalDetails.current = ev.target.getBoundingClientRect();
        setIsModalOpen(true);
    };

    return (
        <div className='date-preview-container'>
            {isModalOpen && (
                <DynamicModalCmp
                    modalDetails={modalDetails.current}
                    modalTitle={modalTitle.current}
                    boardId={boardId}
                    groupId={groupId}
                    task={task}
                    type={modalTitle}
                    onCloseModal={onCloseModal}
                />
            )}


            {(task.isDone) ?
                <IoCheckbox className='checkbox-checked' onClick={toggleIsDone} />
                : <MdCheckBoxOutlineBlank className='checkbox-blank' onClick={toggleIsDone} />
            }


            <button type='button' >
                <span> {utilService.getDateByTimestamp(task.dueDate)}</span>
                {getDueStatus() && <span className={getDueStatus().className}>{getDueStatus().txt}</span>}
                <span className='drop-down-container' role='img' aria-label='DownIcon'>
                    <svg onClick={(ev) => { onOpenModal(ev, 'Dates') }} className='svg' width='24' height='24' role='presentation' focusable='false' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z' fill='currentColor'></path></svg>
                </span>
            </button>
        </div>
    )
}
