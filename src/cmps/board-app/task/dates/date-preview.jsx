import React from 'react';
import { useDispatch } from 'react-redux';
// Icons
import { IoCheckbox } from 'react-icons/io5';
import { MdCheckBoxOutlineBlank } from 'react-icons/md';
// Service
import { utilService } from '../../../../services/util.service'
// Store
import { saveTask } from '../../../../store/actions/task.action'
import { DynamicModalCmp } from '../../../general/dynamic-modal-cmp';

import { TaskDateModal } from './task-date-modal'

export function DatePreview({ task, boardId, groupId }) {

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

    return (
        <div className='date-preview-container'>
            {/* <DynamicModalCmp
                task={task}
                boardId={boardId}
                groupId={groupId}
            /> */}
            {(task.isDone) ?
                <IoCheckbox className='checkbox-checked' onClick={toggleIsDone} />
                : <MdCheckBoxOutlineBlank className='checkbox-blank' onClick={toggleIsDone} />
            }


            <button type='button' >
                <span> {utilService.getDateByTimestamp(task.dueDate)}</span>
                {getDueStatus() && <span className={getDueStatus().className}>{getDueStatus().txt}</span>}
                <span className='drop-down-container' role='img' aria-label='DownIcon'>
                    <svg className='svg' width='24' height='24' role='presentation' focusable='false' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z' fill='currentColor'></path></svg>
                </span>
            </button>
        </div>
    )
}
