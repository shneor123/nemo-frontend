import { useDispatch } from 'react-redux';
import { saveChecklist } from '../../store/actions/checklist.action';
import { utilService } from '../../services/basic/util.service';
import { userService } from '../../services/basic/user.service';
import { useForm } from '../../hooks/useForm';
import { setModal } from '../../store/actions/app.actions';


export const ChecklistModal = ({ boardId, groupId, taskId, taskTitle }) => {
    const [fields, handleChange] = useForm({ title: 'Checklist' })
    const dispatch = useDispatch()


    const onCloseModal = () => {
        dispatch(setModal(null))
    }

    const onSaveChecklist = (ev) => {
        ev.preventDefault()
        const checklist = {}
        checklist.id = utilService.makeId()
        checklist.title = fields.title
        checklist.todos = []
        const activity = {
            txt: 'added Checklist to this card',
            boardTxt: 'added Checklist to ' + taskTitle,
            byMember: userService.getLoggedinUser() || {
                username: "guest",
                fullname: "guest",
                imgUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            },
        }
        dispatch(saveChecklist(checklist, boardId, groupId, taskId, activity));
        onCloseModal?.()
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