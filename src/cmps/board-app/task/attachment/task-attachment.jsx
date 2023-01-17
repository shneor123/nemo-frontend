import { AttachmentPreview } from './attachment-preview'
import { ImAttachment } from 'react-icons/im'
import { DynamicModalCmp } from '../../../general/dynamic-modal-cmp'
import { useRef, useState } from 'react'

export const TaskAttachment = ({ task, boardId, groupId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const modalDetails = useRef()
    const modalTitle = useRef()
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
                {isModalOpen && (
                    <DynamicModalCmp
                        boardId={boardId}
                        groupId={groupId}
                        task={task}
                        attachments={attachments}
                        modalDetails={modalDetails.current}
                        modalTitle={modalTitle.current}
                        type={modalTitle}
                        onCloseModal={onCloseModal}
                    />
                )}
                <ImAttachment className='attach-icon' />
                <h3>Attachments</h3>
            </div>
            <div className='attachments-container'>
                <div className='attachment-list'>
                    {elAttachments}
                </div>
                <div className="sidebar-button add-attach" onClick={(ev) => { onOpenModal(ev, 'Attachment') }}>
                    <span>Add an attachment</span>
                </div>
            </div>
        </div>
    )
}

