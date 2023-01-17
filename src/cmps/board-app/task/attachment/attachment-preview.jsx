import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { utilService } from '../../../../services/basic/util.service'
import { saveTask } from '../../../../store/actions/task.action'
import { BsSquareHalf } from "react-icons/bs"
import { userService } from '../../../../services/basic/user.service'
import { DynamicModalCmp } from '../../../general/dynamic-modal-cmp'
export const AttachmentPreview = ({ task, boardId, groupId, attachment }) => {
    const [attachmentTitle, setAttachmentTitle] = useState(attachment.name)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dispatch = useDispatch()
    const modalDetails = useRef()
    const modalTitle = useRef()

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

    const editTitle = (fileName) => {
        const attIdx = task.attachments.findIndex((currAtt) => currAtt.id === attachment.id)
        task.attachments[attIdx].name = fileName
        dispatch(saveTask(task, boardId, groupId))
    }

    const toggleAttachmentCover = (ev) => {
        if (attachment.url) {
            task.style = { imgUrl: attachment.url, isCover: task.style.isCover }
            updateTask({ ...task })
        } else {
            task.style = {}
        }
    }

    const updateTask = (updatedTask) => {
        task.attachment = updatedTask
        dispatch(saveTask(task, boardId, groupId))
    }

    const onCloseModal = () => {
        setIsModalOpen(false)
    }

    const onOpenModal = (ev, txt) => {
        if (isModalOpen) {
            setIsModalOpen(false)
        }
        modalTitle.current = txt
        modalDetails.current = ev.target.getBoundingClientRect()
        setIsModalOpen(true)
    }
    return (
        <>
            <div className='attachment-preview-container' >
                {isModalOpen && (
                    <DynamicModalCmp
                        modalDetails={modalDetails.current}
                        modalTitle={modalTitle.current}
                        type={modalTitle}
                        onCloseModal={onCloseModal}
                        attachment={attachment}
                        attachmentTitle={attachmentTitle}
                        editTitle={editTitle}
                        onRemoveAttachment={onRemoveAttachment}
                    />
                )}
                <img className='attachment-preview-img' src={attachment.url} />
                <a className='attachment-preview-img'
                    style={{ backgroundImage: `url(${attachment.url})` }}
                    href={attachment.url} target={'_blank'}>
                </a>
                <div className='attachment-details'>
                    <span className='attachment-name'>{attachment.name}</span>
                    <div className='actions-container'>
                        <span>{utilService.timeSince(attachment.createdAt)}</span>
                        <span> -</span>
                        <span className='action-btn' onClick={(ev) => { onOpenModal(ev, 'attachment-delete') }}>Delete</span>
                        <span> -</span>
                        <span className='action-btn' onClick={(ev) => { onOpenModal(ev, 'Attachment edit') }}>Edit</span>

                        <span> -</span>
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
