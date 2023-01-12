import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers'

import { removeTask, saveTask } from '../../../../store/actions/task.action'
import { userService } from '../../../../services/basic/user.service'

export function TaskDateModal({ boardId, groupId, task }) {

    const [selectedDate, setSelectedDate] = useState(new Date())
    const dispatch = useDispatch()

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

    return (

        <section className='dates-modal'>
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
                <button className='secondary-btn gray' onClick={onRemove}> Remove </button>
            </div>
        </section>
    )
}



