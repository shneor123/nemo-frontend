import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "../../../store/actions/app.actions";
import { saveTask } from "../../../store/actions/task.action";

import { AiOutlineCreditCard } from "react-icons/ai";
import { TiTag } from "react-icons/ti";
import { BsPerson } from "react-icons/bs";
import { MdOutlineScreenShare } from "react-icons/md";
import { BsClock } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md"
import { GiRobotAntennas } from 'react-icons/gi'
import { RiArchiveLine } from "react-icons/ri";

export const EditBtn = ({ board, onOpenTaskDetails, onRemoveTask, boardId, labels, groupId, task, boardMembers, onCloseQuickEdit }) => {
    const dispatch = useDispatch()
    const labelsRef = useRef()
    const membersRef = useRef()
    const coverRef = useRef()
    const datesRef = useRef()
    const claraRef = useRef()
    const copyRef = useRef()



    const onArchiveTask = () => {
        updateTask({ ...task, archivedAt: Date.now() })
        onCloseQuickEdit()
    }
    const updateTask = (updatedTask) => {
        task.archivedAt = updatedTask.archivedAt
        dispatch(saveTask(task, boardId, groupId))
    }

    const onOpenModal = (e, modal) => {
        e.stopPropagation()
        dispatch(setModal(modal))
    }
    const onModalMember = (e) => {
        e.stopPropagation()
        dispatch(setModal({
            element: membersRef.current,
            category: 'Members',
            title: 'Members',
            props: { element: membersRef.current, board, boardId, groupId, task, boardMembers },

        })
        )
    }
    const onModallabels = (e) => {
        e.stopPropagation()
        dispatch(
            setModal({
                element: membersRef.current,
                category: 'Labels',
                title: 'Labels',
                props: { element: labelsRef.current, boardId, groupId, task, labels, boardMembers },
            })
        )
    }

    return (
        <div className="edit-btn" >

            <span className="quick-card-editor-buttons-item" onClick={onOpenTaskDetails}><AiOutlineCreditCard /> Open card</span>

            <span className="quick-card-editor-buttons-item" ref={labelsRef} onClick={onModallabels}> < TiTag /> Edit labels </span>

            <span className="quick-card-editor-buttons-item" ref={membersRef} onClick={onModalMember}> <BsPerson /> Change members </span>

            <span className="quick-card-editor-buttons-item" ref={coverRef}
                onClick={(ev) => onOpenModal(ev, {
                    element: coverRef.current,
                    category: 'Cover',
                    title: 'Cover',
                    props: { element: coverRef.current, boardId, groupId, task, labels, boardMembers },
                })}><MdOutlineScreenShare /> Change cover</span>

            <span className="quick-card-editor-buttons-item" ref={datesRef}
                onClick={(ev) => onOpenModal(ev, {
                    element: datesRef.current,
                    category: 'Dates',
                    title: 'Dates',
                    props: { element: datesRef.current, boardId, groupId, task, labels, boardMembers },
                })}><BsClock /> Edit dates</span>

            <span className="quick-card-editor-buttons-item" ref={claraRef}
                onClick={(ev) => onOpenModal(ev, {
                    element: claraRef.current,
                    category: 'AI Clara',
                    title: 'AI Clara',
                    props: { element: claraRef.current, boardId, groupId, task, labels, boardMembers },
                })}><GiRobotAntennas /> AI Clara</span>

            <span className="quick-card-editor-buttons-item" ref={copyRef}
                onClick={(ev) => onOpenModal(ev, {
                    element: copyRef.current,
                    category: 'Copy card',
                    title: 'Copy card',
                    props: { element: copyRef.current, boardId, groupId, task, labels, boardMembers },
                })}><BsClock />  Copy</span>

            <span className="quick-card-editor-buttons-item" onClick={onArchiveTask}><RiArchiveLine /> Archive</span>

            <span className="quick-card-editor-buttons-item" onClick={onRemoveTask}><MdDeleteOutline /> Remove task</span>
        </div>
    )
}
