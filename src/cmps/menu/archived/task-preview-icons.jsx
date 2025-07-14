import { utilService } from '../../../services/basic/util.service'

import { FiClock } from 'react-icons/fi'
import { MdOutlineSubject } from 'react-icons/md'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { ImAttachment } from 'react-icons/im'

export function TaskPreviewIcons({ task ,getTimeStyle, getChecklistLength }) {
  return (
    <div className="task-icon-container">
      <div className="icon-container">
        {task.dueDate && !task.style.coverSize && (
          <div className="icon-time-container" style={getTimeStyle()}>
            <FiClock /> <span> {utilService.formatTimeToDM(task.dueDate)} </span>
          </div>
        )}
        {task.description && !task.style.backgroundColor && !task.style.imgUrl && <MdOutlineSubject />}
        {task.checklists && !!task.checklists.length && !task.style.coverSize && (
          <div className="icon-num-container">
            {' '}
            <IoMdCheckboxOutline /> <span> {getChecklistLength()} </span>{' '}
          </div>
        )}
        {task.attachments && !!task.attachments.length && !task.style.coverSize && (
          <div className="icon-num-container">
            <ImAttachment className="attachment-icon" /> <span> {task.attachments.length} </span>{' '}
          </div>
        )}
      </div>
      {task.members && !!task.members.length && !task.style.coverSize && (
        <div className="member-img-container">
          {task.members.map((member) => (
            <div key={member._id} style={{ background: `url(${member.imgUrl}) center center / cover ` }} className="user-avatar"></div>
          ))}
        </div>
      )}
    </div>
  )
}