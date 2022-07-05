import { useDispatch } from 'react-redux';
import { useState } from "react";
import { saveChecklist } from '../../store/actions/checklist.action';
import { utilService } from '../../services/util.service';
import { userService } from '../../services/user.service';


export const ChecklistModal = ({ boardId, groupId, taskId, onCloseModal, taskTitle }) => {
    const [checklistTitle, setChecklistTitle] = useState({ title: 'Checklist' });
    const dispatch = useDispatch()
    const handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        setChecklistTitle({ [field]: value });
    }

    const onSaveTask = (ev) => {
        ev.preventDefault()
        const checklist = checklistTitle
        checklist.id = utilService.makeId()
        checklist.todos = []
        const activity = {
            txt: 'added Checklist to this card',
            boardTxt: 'added Checklist to ' + taskTitle,
            byMember: userService.getLoggedinUser()
        }
        dispatch(saveChecklist(checklist, boardId, groupId, taskId, activity));
        setChecklistTitle({ title: 'Checklist' });
        onCloseModal()
    }

    return <div className="checklist-modal-container">

        <form onSubmit={onSaveTask} className=" flex column">
            {/* make a label modal helper class and change classname */}
            <label className='modal-small-title check-title' htmlFor='title'>Title</label>

            <input type="text"
                name='title'
                id='title'
                className='add-checklist'
                value={checklistTitle.title}
                onChange={handleChange}
            />
            <button>Add</button>
        </form>


    </div>
}