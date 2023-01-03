import React from 'react'
import { useDispatch } from 'react-redux'
import { utilService } from '../../../../services/util.service'
import { saveTask } from '../../../../store/actions/task.action'
import { BsSquareHalf } from "react-icons/bs"

export const AttachmentPreview = ({ task, boardId, groupId, attachment }) => {
    console.log("🚀 ~ file: attachment-preview.jsx:8 ~ AttachmentPreview ~ task", task)

    const dispatch = useDispatch()

    const onRemoveAttachment = () => {
        const attachmentIdx = task.attachments.findIndex(attachment => attachment.id === attachment)
        task.attachments.splice(attachmentIdx, 1)
        dispatch(saveTask(task, boardId, groupId, attachmentIdx))
    }

    const editTitle = (name) => {
        // const { id } = attachment
        // const attachmentForUpdate = { ...attachment, name }
        // const taskToUpdate = task.attachments.map(attachment => attachment.id !== id ? attachment : attachmentForUpdate)
        // dispatch(saveTask(task, boardId, groupId, taskToUpdate))
    }

    return (
        <>
            <div className='attachment-preview-container' >
                <a className='attachment-preview-img'
                    style={{ backgroundImage: `url(${attachment.url})` }}
                    href={attachment.url} target={'_blank'}>
                </a>
                <img className='attachment-preview-img' src={attachment.url} />
                <div className='attachment-details'>
                    <span className='attachment-name'>{attachment.name}</span>
                    <div className='actions-container'>
                        <span>{utilService.timeSince(attachment.createdAt)}</span>
                        <span> -</span>
                        <span className='action-btn' onClick={onRemoveAttachment}>Delete</span>
                        <span> -</span>
                        <span className='action-btn' onClick={editTitle}>Edit</span>
                        <span> -</span>
                    </div>
                    <span className='actions-container action-btn' >
                        <BsSquareHalf style={{ transform: `rotate(270deg)`, height: '10px' }} />
                        {(attachment.url === task.style.backgroundColor) ? 'Remove' : 'Make'} Cover</span>
                </div>
            </div>
        </>
    )
}
