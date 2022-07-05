import { useEffect, useState } from "react";
import { GrTextAlignFull } from "react-icons/gr";

import { useDispatch } from "react-redux";
import { saveTask } from "../../../store/actions/task.action.js";



export const Description = ({ task, boardId, groupId }) => {
    const [isDescOpen, setIsDescOpen] = useState(false)
    const [descTitle, setDescTitle] = useState({ title: task.description ? task.description : "" });
    const dispatch = useDispatch()



    const handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        setDescTitle({ [field]: value });
    };

    const onSaveTask = () => {
        task.description = descTitle.title
        dispatch(saveTask(task, boardId, groupId));
        setIsDescOpen(false)
        setDescTitle({ title: task.description ? task.description : "" });
    }

    return <section className="task-description flex column " onBlur={() => setIsDescOpen(false)}>
        <div className="title-container flex row">
            <span className="svg-icon-desc">< GrTextAlignFull /></span>   <h3 className="desc-title">Description</h3>
        </div>
        <form onSubmit={onSaveTask}>
            <textarea onClick={() => setIsDescOpen(true)}
                name="title"
                spellCheck={false}
                className="text-desc"
                placeholder="Add a more detailed description..."
                value={descTitle.title}
                onChange={handleChange}

            >
            </textarea>
            {isDescOpen && <div className="open-desc-btns">
                <button onMouseDown={onSaveTask}>Save</button>
                <span className="cancel" onClick={() => setIsDescOpen(false)}>
                    Cancel
                </span>
            </div>}
        </form>
    </section>

}