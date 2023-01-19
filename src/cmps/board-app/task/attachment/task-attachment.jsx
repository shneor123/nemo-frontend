import { AttachmentPreview } from './attachment-preview'
import { ImAttachment } from 'react-icons/im'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { setModal } from '../../../../store/actions/app.actions'

export const TaskAttachment = ({ task, boardId, groupId }) => {
    const attachmentRef = useRef()
    const dispatch = useDispatch()

    const onOpenModal = (ev, modal) => {
        dispatch(setModal(modal))
    }

    const { attachments } = task
    const elAttachments = attachments.map(attachment =>
        <AttachmentPreview
            task={task}
            boardId={boardId}
            groupId={groupId}
            key={attachment.id}
            attachment={attachment}
        />)

    return (
        attachments.length > 0 && <div className='task-attachments-container'>
            <div className='title-container'>
                <ImAttachment className='attach-icon' />
                <h3>Attachments</h3>
            </div>
            <div className='attachments-container'>
                <div className='attachment-list'>
                    {elAttachments}
                </div>
                <div className="sidebar-button add-attach" ref={attachmentRef}
                    onClick={(ev) => onOpenModal(ev, {
                        element: attachmentRef.current,
                        category: 'Attachment',
                        title: 'Attachment',
                        props: { element: attachmentRef.current, boardId, groupId, task, attachments },
                    })}><span>Add an attachment</span>
                </div>
            </div>
        </div>
    )
}

