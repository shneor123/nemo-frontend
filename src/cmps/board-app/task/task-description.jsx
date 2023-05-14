import { useState } from "react";
import { useDispatch } from "react-redux";
import { GrTextAlignFull } from "react-icons/gr";

import { useForm } from "../../../hooks/useForm";
import { saveTask } from "../../../store/actions/task.action";

export const Description = ({ task, boardId, groupId }) => {
    const [isDescOpen, setIsDescOpen] = useState(false)
    const dispatch = useDispatch()
    const [fields, handleChange] = useForm({ description: task.description })

    const onSaveTask = () => {
        task.description = fields.description
        dispatch(saveTask(task, boardId, groupId));
        setIsDescOpen(false)
    }

    return (
        <section className="task-description flex column " onBlur={() => setIsDescOpen(false)}>
            <div className="title-container flex row">
                <span className="svg-icon-desc trellicons desc-icon large"></span>
                <h3 className="desc-title">Description</h3>
            </div>
            <form onSubmit={onSaveTask}>
                <textarea onClick={() => setIsDescOpen(true)}
                    name="description"
                    spellCheck={false}
                    className="text-desc"
                    placeholder="Add a more detailed description..."
                    value={fields.description}
                    onChange={handleChange}

                >
                </textarea>
                {isDescOpen && <div className="open-desc-btns">
                    <button onMouseDown={onSaveTask}>Save</button>
                    <span className="cancel" onClick={() => setIsDescOpen(false)}>
                        Cancel
                    </span>Ï
                </div>}
            </form>
        </section>
    )
}