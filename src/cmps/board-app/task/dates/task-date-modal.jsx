import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers'

import { saveTask } from '../../../../store/actions/task.action'

export function TaskDateModal({ boardId, groupId, task  }) {

    const [selectedDate, setSelectedDate] = useState(new Date())
    const dispatch = useDispatch()

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const onSetDate = () => {
        // task.dueDate = selectedDate ? Date.parse(selectedDate) : 0
        task.dueDate = Date.parse(selectedDate)
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
            </div>
        </section>
    )
}



