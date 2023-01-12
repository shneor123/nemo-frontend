import React, { useState } from 'react'
import { GrTextAlignFull } from 'react-icons/gr'
import { AiOutlineUser } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { useForm } from '../../../hooks/useForm'
import { updateBoard } from '../../../store/actions/board.action'
export const AboutThisBoard = ({ iOpenAboutBoard, board }) => {
    const [isDescOpen, setIsDescOpen] = useState(false)
    const dispatch = useDispatch()
    const [fields, handleChange] = useForm({ description: board.description })

    const onSaveBoard = () => {
        board.description = fields.description
        dispatch(updateBoard(board))
        setIsDescOpen(false)
    }

    return (
        <section className="task-description flex column " onBlur={() => setIsDescOpen(false)} style={{ display: iOpenAboutBoard }}>

            <div className="member-img-container">
                <h1><AiOutlineUser />Board admins</h1>
                <img src={board.createdBy.imgUrl} alt="" className="member-img" />
                <strong>{board.createdBy.fullname}</strong>
                <p>{board.createdBy.username}</p>
            </div>
            <div className="title-container flex row">
                <span className="svg-icon-desc">< GrTextAlignFull /></span>
                <h3 className="desc-title">Description</h3>
            </div>
            <form onSubmit={onSaveBoard}>
                <textarea
                    onClick={() => setIsDescOpen(true)}
                    name="description"
                    spellCheck={false}
                    className="text-desc-about"
                    placeholder="Add a more detailed description..."
                    value={fields.description}
                    onChange={handleChange}
                >
                </textarea>
                {isDescOpen && <div className="open-desc-btns">
                    <button onMouseDown={onSaveBoard}>Save</button>
                    <span className="cancel" onClick={() => setIsDescOpen(false)}>
                        Cancel
                    </span>
                </div>}
            </form>
        </section>
    )
}

