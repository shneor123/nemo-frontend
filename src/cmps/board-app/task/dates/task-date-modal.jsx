import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers'
import { saveTask } from '../../../../store/actions/task.action'
import { userService } from '../../../../services/basic/user.service'
import { setModal } from '../../../../store/actions/app.actions'
import { utilService } from '../../../../services/basic/util.service'

export function TaskDateModal({ boardId, groupId, task }) {
    const dateRef = useRef()
    const dispatch = useDispatch()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [time, setTime] = useState(utilService.getTimeFormat(selectedDate))

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }
    const handleChange = ({ target }) => {
        setTime(target.value)
    }
    const onSaveDate = () => {
        const updatedTask = { ...task }
        const newDate = utilService.getNewDateTime(selectedDate, time)
        if (newDate) updatedTask.dueDate = newDate
        else updatedTask.dueDate = selectedDate
        const activity = {
            txt: "added date",
            boardTxt: `changed the due date of this task to ${selectedDate} in ${task.title}`,
            byMember: userService.getLoggedinUser() || {
                username: "guest",
                fullname: "guest",
                imgUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            },
        };
        // task.dueDate = selectedDate ? Date.parse(selectedDate) : 0
        task.dueDate = Date.parse(selectedDate)
        dispatch(saveTask(updatedTask, boardId, groupId, activity))
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
    const onOpenModal = (ev, modal) => {
        dispatch(setModal(modal))
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
            </div>

            <div className="date-container">
                <div className="display-date">{utilService.getDateTimeFormat(selectedDate).displayDateOnly}</div>
                <input className="pick-time" type="text" onChange={handleChange} value={time}></input>
            </div>


            <button className='secondary-btn' onClick={onSaveDate}> Save </button>
            <button className='secondary-btn gray' ref={dateRef}
                onClick={(ev) => onOpenModal(ev, {
                    element: dateRef.current,
                    category: 'date-delete',
                    title: 'date-delete',
                    props: { element: dateRef.current, onRemove },
                })}>Remove </button>
        </section>
    )
}



