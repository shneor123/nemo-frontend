import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers'

import { saveTask } from '../../../../store/actions/task.action'
import { userService } from '../../../../services/basic/user.service'
import { DynamicModalCmp } from '../../../general/dynamic-modal-cmp'

export function TaskDateModal({ boardId, groupId, task }) {
    const dispatch = useDispatch()
    const modalDetails = useRef()
    const modalTitle = useRef()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date())

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const onSetDate = () => {
        const activity = {
            txt: "added date",
            boardTxt: `added date ${selectedDate} to ${task.title}`,
            byMember: userService.getLoggedinUser() || {
                username: "guest",
                fullname: "guest",
                imgUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            },
        };
        // task.dueDate = selectedDate ? Date.parse(selectedDate) : 0
        task.dueDate = Date.parse(selectedDate)
        dispatch(saveTask(task, boardId, groupId, activity))
    }

    const onRemove = () => {
        const updatedTask = { ...task }
        updatedTask.dueDate = null
        updateTask(updatedTask)
    }

    const updateTask = (updatedTask) => {
        task.dueDate = updatedTask.dueDate
        dispatch(saveTask(task, boardId, groupId))
    }

    const onCloseModal = () => {
        setIsModalOpen(false)
    }

    const onOpenModal = (ev, txt) => {
        if (isModalOpen) {
            setIsModalOpen(false)
        }
        modalTitle.current = txt
        modalDetails.current = ev.target.getBoundingClientRect()
        setIsModalOpen(true)
    }

    return (
        <section className='dates-modal'>
            {isModalOpen && (
                <DynamicModalCmp
                    modalDetails={modalDetails.current}
                    modalTitle={modalTitle.current}
                    type={modalTitle}
                    onRemove={onRemove}
                    onCloseModal={onCloseModal}
                />
            )}

            <div className='details-container'>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant='static'
                        format='MM/dd/yyyy'
                        margin='normal'
                        id='date-picker-inline'
                        label='Date picker inline'
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <button className='secondary-btn' onClick={onSetDate}> Save </button>
                <button className='secondary-btn gray' onClick={(ev) => { onOpenModal(ev, 'date-delete') }}> Remove </button>
            </div>
        </section>
    )
}



