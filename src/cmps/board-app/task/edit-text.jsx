import { useDispatch } from "react-redux";
import { useForm } from "../../../hooks/useForm";
import { saveTask } from "../../../store/actions/task.action";




export const EditText = ({ task, boardId, groupId, onCloseQuickEdit }) => {
    const [fields, handleChange] = useForm({ title: task.title });
    const dispatch = useDispatch()

    const onSaveTask = (ev) => {
        ev.preventDefault()
        task.title = fields.title
        dispatch(saveTask(task, boardId, groupId))
        onCloseQuickEdit()
    }

    return (
        <div className="edit-text">
            <form>
                <textarea
                    name="title"
                    value={fields.title}
                    onChange={handleChange}
                    autoFocus
                    onFocus={(e) => e.target.select()}

                >
                </textarea>
                <button onClick={onSaveTask}>Save</button>
            </form>
        </div>
    )
}