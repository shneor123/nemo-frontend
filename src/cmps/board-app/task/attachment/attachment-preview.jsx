import React from 'react'
import { useDispatch } from 'react-redux'
import { utilService } from '../../../../services/basic/util.service'
import { saveTask } from '../../../../store/actions/task.action'
import { BsSquareHalf } from "react-icons/bs"
import { userService } from '../../../../services/basic/user.service'

export const AttachmentPreview = ({ task, boardId, groupId, attachment }) => {
    const dispatch = useDispatch()

    const onRemoveAttachment = () => {
        const { name } = attachment;
        const attachmentIdx = task.attachments.findIndex(attachment => attachment.id === attachment)
        task.attachments.splice(attachmentIdx, 1)
        const activity = {
            txt: 'deleted attachment from this card',
            boardTxt: `deleted the ${name} attachment`,
            byMember: userService.getLoggedinUser() || {
                username: "guest",
                fullname: "guest",
                imgUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            },
        }
        dispatch(saveTask(task, boardId, groupId, activity, attachmentIdx))
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
