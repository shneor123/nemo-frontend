import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { utilService } from '../../../../services/basic/util.service'
import { saveTask } from '../../../../store/actions/task.action'
import { BsSquareHalf } from "react-icons/bs"
import { userService } from '../../../../services/basic/user.service'
import { setModal } from '../../../../store/actions/app.actions'

export const AttachmentPreview = ({ task, boardId, groupId, attachment }) => {
    const [attachmentTitle, setAttachmentTitle] = useState(attachment.name)
    const [newTask, setNewTask] = useState(task)
    const dispatch = useDispatch()
    const deleteRef = useRef()
    const editRef = useRef()

const onRemoveAttachment = () => {
    const { name } = attachment;
    const attachmentIdx = task.attachments.findIndex(a => a.id === attachment.id)
    if (attachmentIdx !== -1) {
        task.attachments.splice(attachmentIdx, 1)
    }

    const activity = {
        txt: 'deleted attachment from this card',
        boardTxt: `deleted the ${name} attachment`,
        byMember: userService.getLoggedinUser() || {
            username: "guest",
            fullname: "guest",
            imgUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        },
    }

    dispatch(saveTask(task, boardId, groupId, activity))
}


    const editTitle = (fileName) => {
        const attIdx = task.attachments.findIndex((currAtt) => currAtt.id === attachment.id)
        task.attachments[attIdx].name = fileName
        dispatch(saveTask(task, boardId, groupId))
    }

    const toggleAttachmentCover = (ev) => {
        if (attachment.url !== task.style.imgUrl) {
            task.style = { imgUrl: attachment.url, isCover: task.style.isCover }
            updateTask({ ...task })
        } else {
            task.style = {}
        }
    }

    const onRemoveCover = () => {
        const updatedTask = { ...task }
        const style = {}
        updatedTask.style = style
        setNewTask(updatedTask)
        updateTask({ ...newTask })
    }

    const updateTask = (updatedTask) => {
        task.attachment = updatedTask
        dispatch(saveTask(task, boardId, groupId))
    }

    const onOpenModal = (ev, modal) => {
        dispatch(setModal(modal))
    }

    return (
        <>
            <div className='attachment-preview-container' >
                <a className='attachment-preview-img'
                    style={{ backgroundImage: `url(${attachment.url})` }}
                    href={attachment.url} target={'_blank'}>
                    <img className='attachment-preview-img' src={attachment.url} />
                </a>
                <div className='attachment-details'>
                    <span className='attachment-name'>{attachment.name}</span>
                    <div className='actions-container'>
                        <span>{utilService.timeSince(attachment.createdAt)}</span>
                        <span> -</span>
                        <span className='action-btn' ref={deleteRef}
                            onClick={(ev) => onOpenModal(ev, {
                                element: deleteRef.current,
                                category: 'attachment-delete',
                                title: 'attachment-delete',
                                props: { element: deleteRef.current, attachment, attachmentTitle, editTitle, onRemoveAttachment },
                            })}>Delete</span>
                        <span> -</span>
                        <span className='action-btn' ref={editRef}
                            onClick={(ev) => onOpenModal(ev, {
                                element: editRef.current,
                                category: 'Attachment edit',
                                title: 'Attachment edit',
                                props: { element: editRef.current, attachment, attachmentTitle, editTitle, onRemoveAttachment },
                            })}>Edit</span>
                        <span> - </span>
                    </div>
                    <span className='actions-container action-btn'
                        onClick={() => { toggleAttachmentCover() }}>

                        <BsSquareHalf style={{ transform: `rotate(270deg)`, height: '10px' }} />
                        {(attachment.url === task.style.imgUrl) ? 'Remove' : 'Make'} Cover</span>
                </div>
            </div>
        </>
    )
}
