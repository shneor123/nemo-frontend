import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IoCheckbox } from 'react-icons/io5'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'

import { saveTask } from '../../../../store/actions/task.action'
import { utilService } from '../../../../services/basic/util.service'
import { userService } from '../../../../services/basic/user.service'
import { setModal } from '../../../../store/actions/app.actions'

export function DatePreview({ group, task, boardId, groupId }) {
    const dispatch = useDispatch()
    const datesRef = useRef()

    const toggleIsDone = () => {
        task.isDone = !task.isDone
        const activity = {
            txt: 'marked due date in this card',
            boardTxt: `marked the due date ${(task.isDone) ? "complete " : "incomplete"}`,
            byMember: userService.getLoggedinUser() || {
                username: "guest",
                fullname: "guest",
                imgUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            },
        }
        dispatch(saveTask(task, boardId, groupId, activity))
    }

    const getDueStatus = () => {
        if (task.isDone) return { txt: 'complete', className: 'complete' };
        if (Date.now() > task.dueDate) {
            return { txt: 'overdue', className: 'over-due' };
        } else {
            const timeDiff = task.dueDate - Date.now();
            if (timeDiff < 90000000) return { txt: 'due sun', className: 'due-soon' };
        }
    }

    const onOpenModal = (ev, modal) => {
        dispatch(setModal(modal))
    }
    return (
        <div className='date-preview-container'>
            {(task.isDone) ?
                <IoCheckbox className='checkbox-checked' onClick={toggleIsDone} />
                : <MdCheckBoxOutlineBlank className='checkbox-blank' onClick={toggleIsDone} />
            }
            <button type='button' ref={datesRef}
                onClick={(ev) => onOpenModal(ev, {
                    element: datesRef.current,
                    category: 'Dates',
                    title: 'Dates',
                    props: { element: datesRef.current, boardId, groupId, task, group },
                })}>
                <span> {utilService.getDateByTimestamp(task.dueDate)}</span>
                {getDueStatus() && <span className={getDueStatus().className}>{getDueStatus().txt}</span>}
                <span className='drop-down-container' role='img' aria-label='DownIcon'>
                    <span className="fa-solid down-icon"></span>
                </span>
            </button>
        </div>
    )
}
