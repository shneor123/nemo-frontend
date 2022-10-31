import { useDispatch } from 'react-redux';
import { useState } from "react";
import { saveChecklist } from '../../store/actions/checklist.action';
import { utilService } from '../../services/util.service';
import { userService } from '../../services/user.service';
import { useForm } from '../../hooks/useForm';


export const ChecklistModal = ({ boardId, groupId, taskId, onCloseModal, taskTitle }) => {
    const [fields, handleChange] = useForm({title: 'Checklist'})
    const dispatch = useDispatch()

    const onSaveChecklist = (ev) => {
        ev.preventDefault()
        const checklist = {}
        checklist.id = utilService.makeId()
        checklist.title = fields.title
        checklist.todos = []
        const activity = {
            txt: 'added Checklist to this card',
            boardTxt: 'added Checklist to ' + taskTitle,
            byMember: userService.getLoggedinUser()
        }
        dispatch(saveChecklist(checklist, boardId, groupId, taskId, activity));
        onCloseModal()
    }

    return <div className="checklist-modal-container">
        <form onSubmit={onSaveChecklist} className=" flex column">
            {/* make a label modal helper class and change classname */}
            <label className='modal-small-title check-title' htmlFor='title'>Title</label>

            <input type="text"
                name='title'
                id='title'
                className='add-checklist'
                value={fields.title}
                onChange={handleChange}
            />
            <button>Add</button>
        </form>


    </div>
}