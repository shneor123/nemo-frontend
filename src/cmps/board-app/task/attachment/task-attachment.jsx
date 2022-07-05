import { AttachmentPreview } from './attachment-preview'
import { ImAttachment } from 'react-icons/im'


export const TaskAttachment = ({ task, boardId, groupId }) => {

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
            </div>
        </div>
    )
}

